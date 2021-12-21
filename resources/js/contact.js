const Contacts = {
  start() {
    this.$modal = $("[data-type-modal]");
    this.$form = $("[data-type-form]");

    this.$id = $("[data-type-id]");
    this.$name = $("[data-type-name]");
    this.$contact = $("[data-type-contact]");
    this.$email = $("[data-type-email]");

    this.$btn = $("[data-btn-confirm]");
    this.$btnNew = $("[data-btn-new]");

    this.token = $("input")[0].value;

    this.$alert = $("[data-form-register-alert]");
    this.$close = $("[data-modal-close]");

    this.$table = $("[data-table-imageTypes]");

    this.$modal.modal("hide");

    this.$datatable = null;

    this.bind();
    this.dataTable();
  },

  bind() {
    this.$btn.on("click", $.proxy(this.onFormSubmit, this));
    this.$close.on("click", $.proxy(this.onCloseModal, this));
    this.$btnNew.on("click", $.proxy(this.onBtnNewClick, this));
    this.$table.on(
      "click",
      "[data-btn-edit]",
      $.proxy(this.onBtnEditClick, this)
    );
    this.$table.on(
      "click",
      "[data-btn-destroy]",
      $.proxy(this.onBtnDestroyClick, this)
    );
  },

  dataTable() {
    this.$datatable = this.$table.DataTable({
      processing: true,
      serverSide: true,
      pageLength: 25,
      searching: false,
      responsive: true,
      dom: '<"html5buttons"B>lTfgitp',
      buttons: [
        {
          extend: "excel",
          title: "exportar para excel",
          text: '<span class="fa fa-file-excel-o"></span> Excel ',
        },
        {
          extend: "pdf",
          title: "exportar para pdf",
          text: '<span class="fa fa-file-pdf-o"></span> PDF ',
        },
        {
          extend: "print",
          text: '<span class="fa fa-print"></span> Imprimir ',
          customize: function (win) {
            const $body = $(win.document.body);

            $body.addClass("white-bg").css("font-size", "10px");

            $body.find("table").addClass("compact").css("font-size", "inherit");
          },
        },
      ],
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json",
      },
      ajax: {
        url: "/tipo-de-imagem/search",
      },
      columns: [
        {
          data: "title",
        },
        {
          data: "description",
        },
        {
          data: null,
          width: "15%",
          render: function (data, type, full, meta) {
            const btnEdit = `
                  <button
                    class="btn btn-xs btn-primary"
                    title="Editar"
                    type="button"
                    data-btn-edit
                    data-id="${data.id}"
                    data-title="${data.title}"
                    data-description="${data.description}"
                  >
                    <span class="sr-only">Editar</span>
                    <i class="fas fa-pen" aria-hidden="true"></i>
                  </button>
                `;

            const btnDestroy = `
                  <button
                    class="btn btn-xs btn-danger"
                    title="Excluir"
                    type="button"
                    data-btn-destroy
                    data-id="${data.id}"
                  >
                    <span class="sr-only">Excluir</span>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                `;

            const buttons = `${btnEdit} ${btnDestroy}`;

            return buttons;
          },
        },
      ],
    });
  },

  onFormSubmit(event) {
    event.preventDefault();

    this.$btn.prop("disabled", true);

    if ("" !== this.$id.val()) {
      this.onEditSubmit();
      return;
    }

    this.$description.removeClass("is-invalid");
    this.$title.removeClass("is-invalid");

    var validInputs = true;

    if ("" === this.$title.val()) {
      this.$title.addClass("is-invalid");
      validInputs = false;
      this.$btn.prop("disabled", false);
    }

    if ("" === this.$description.val()) {
      this.$description.addClass("is-invalid");
      validInputs = false;
      this.$btn.prop("disabled", false);
    }

    if (validInputs) {
      const creating = $.ajax({
        method: "POST",
        url: "/tipo-de-imagem/store",
        ontentType: "application/json",
        data: {
          _token: this.token,
          title: this.$title.val(),
          description: this.$description.val(),
        },
      });

      creating.done($.proxy(this.onCreateSuccess, this));

      creating.fail($.proxy(this.onCreateFail, this));
    }
  },

  onCreateSuccess(data) {
    switch (data.status) {
      case "success":
        this.$alert.text("Tipo de imagem cadastrada com sucesso!");
        this.$alert.addClass("alert-success");
        this.$alert.removeClass("sr-only");

        window.setTimeout(function () {
          $("[data-type-modal]").modal("hide");
          ImageTypes.resetModal();
        }, 2000);

        this.$datatable.ajax.reload().desc;

        break;
    }
  },

  onCreateFail(error) {
    console.log(error);
  },

  onCloseModal(event) {
    event.preventDefault();
    this.$modal.modal("hide");
    ImageTypes.resetModal();
  },

  onBtnNewClick(event) {
    event.preventDefault();
    this.resetModal();
    console.log("entrou no btn new click");
    this.$modal.modal("show");
  },

  resetModal() {
    $("[data-form-register-alert]").addClass("sr-only");
    $("[data-form-register-alert]").removeClass("alert-success");
    $("[data-type-id]").val("");
    $("[data-type-title]").val("");
    $("[data-type-description]").val("");
    $("[data-type-title]").removeClass("is-invalid");
    $("[data-type-description]").removeClass("is-invalid");
    $("[data-btn-confirm]").prop("disabled", false);
  },

  onBtnEditClick(event) {
    event.preventDefault();
    const $btn = $(event.currentTarget);
    const id = $.trim($btn.data("id"));
    const name = $.trim($btn.data("name"));
    const description = $.trim($btn.data("description"));

    this.$id.val(id);
    this.$title.val(name);
    this.$description.val(description);

    this.$modal.modal("show");
  },

  onBtnDestroyClick(event) {
    event.preventDefault();
    swal({
      title: "Tem certeza?",
      text: "Uma vez deletada, não poderá recuperar o tipo de imagem!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const $btn = $(event.currentTarget);
        const id = $.trim($btn.data("id"));

        $.ajax({
          url: `/tipo-de-imagem/destroy/${id}`,
          type: "DELETE",
          data: {
            _token: this.token,
          },
          success: function (data) {
            if (data.success) {
              $("[data-btn-confirm]").prop("disabled", true);
              $("[data-form-register-alert]").addClass("alert-success");
              $("[data-form-register-alert]").text(
                "Tipo de imagem deletada com sucesso!"
              );
              $("[data-form-register-alert]").removeClass("sr-only");
              window.setTimeout(function () {
                $("[data-type-modal]").modal("hide");
              }, 2000);
              ImageTypes.$datatable.ajax.reload().desc;
              return;
            }
          },
        });
        swal("Pronto! O tipo de imagem foi deletado com sucesso!", {
          icon: "success",
        });
      } else {
        swal("Você escolheu cancelar a exclusão!");
      }
    });
  },

  onEditSubmit() {
    this.$description.removeClass("is-invalid");
    this.$title.removeClass("is-invalid");

    var validInputs = true;

    if ("" === this.$title.val()) {
      this.$title.addClass("is-invalid");
      validInputs = false;
      this.$btn.prop("disabled", false);
    }

    if ("" === this.$description.val()) {
      this.$description.addClass("is-invalid");
      validInputs = false;
      this.$btn.prop("disabled", false);
    }

    if (validInputs) {
      const edit = $.ajax({
        method: "PUT",
        url: `/tipo-de-imagem/update/${this.$id.val()}`,
        ontentType: "application/json",
        data: {
          _token: this.token,
          title: this.$title.val(),
          description: this.$description.val(),
        },
      });

      edit.done($.proxy(this.onEditSuccess, this));

      edit.fail($.proxy(this.oneditFail, this));
    }
  },

  onEditSuccess(data) {
    switch (data.status) {
      case "success":
        this.$alert.text("Tipo de imagem atualizada com sucesso!");
        this.$alert.addClass("alert-success");
        this.$alert.removeClass("sr-only");

        window.setTimeout(function () {
          $("[data-type-modal]").modal("hide");
          ImageTypes.resetModal();
        }, 2000);

        this.$datatable.ajax.reload().desc;
        break;
    }
  },

  oneditFail(error) {
    console.log(error);
  },
};

const Contact = () => {
  Contacts.start();
};

export default Contact;
