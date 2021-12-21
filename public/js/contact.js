/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./resources/js/contact.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Contacts = {
  start: function start() {
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
  bind: function bind() {
    this.$btn.on("click", $.proxy(this.onFormSubmit, this));
    this.$close.on("click", $.proxy(this.onCloseModal, this));
    this.$btnNew.on("click", $.proxy(this.onBtnNewClick, this));
    this.$table.on("click", "[data-btn-edit]", $.proxy(this.onBtnEditClick, this));
    this.$table.on("click", "[data-btn-destroy]", $.proxy(this.onBtnDestroyClick, this));
  },
  dataTable: function dataTable() {
    this.$datatable = this.$table.DataTable({
      processing: true,
      serverSide: true,
      pageLength: 25,
      searching: false,
      responsive: true,
      dom: '<"html5buttons"B>lTfgitp',
      buttons: [{
        extend: "excel",
        title: "exportar para excel",
        text: '<span class="fa fa-file-excel-o"></span> Excel '
      }, {
        extend: "pdf",
        title: "exportar para pdf",
        text: '<span class="fa fa-file-pdf-o"></span> PDF '
      }, {
        extend: "print",
        text: '<span class="fa fa-print"></span> Imprimir ',
        customize: function customize(win) {
          var $body = $(win.document.body);
          $body.addClass("white-bg").css("font-size", "10px");
          $body.find("table").addClass("compact").css("font-size", "inherit");
        }
      }],
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json"
      },
      ajax: {
        url: "/tipo-de-imagem/search"
      },
      columns: [{
        data: "title"
      }, {
        data: "description"
      }, {
        data: null,
        width: "15%",
        render: function render(data, type, full, meta) {
          var btnEdit = "\n                  <button\n                    class=\"btn btn-xs btn-primary\"\n                    title=\"Editar\"\n                    type=\"button\"\n                    data-btn-edit\n                    data-id=\"".concat(data.id, "\"\n                    data-title=\"").concat(data.title, "\"\n                    data-description=\"").concat(data.description, "\"\n                  >\n                    <span class=\"sr-only\">Editar</span>\n                    <i class=\"fas fa-pen\" aria-hidden=\"true\"></i>\n                  </button>\n                ");
          var btnDestroy = "\n                  <button\n                    class=\"btn btn-xs btn-danger\"\n                    title=\"Excluir\"\n                    type=\"button\"\n                    data-btn-destroy\n                    data-id=\"".concat(data.id, "\"\n                  >\n                    <span class=\"sr-only\">Excluir</span>\n                    <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                  </button>\n                ");
          var buttons = "".concat(btnEdit, " ").concat(btnDestroy);
          return buttons;
        }
      }]
    });
  },
  onFormSubmit: function onFormSubmit(event) {
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
      var creating = $.ajax({
        method: "POST",
        url: "/tipo-de-imagem/store",
        ontentType: "application/json",
        data: {
          _token: this.token,
          title: this.$title.val(),
          description: this.$description.val()
        }
      });
      creating.done($.proxy(this.onCreateSuccess, this));
      creating.fail($.proxy(this.onCreateFail, this));
    }
  },
  onCreateSuccess: function onCreateSuccess(data) {
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
  onCreateFail: function onCreateFail(error) {
    console.log(error);
  },
  onCloseModal: function onCloseModal(event) {
    event.preventDefault();
    this.$modal.modal("hide");
    ImageTypes.resetModal();
  },
  onBtnNewClick: function onBtnNewClick(event) {
    event.preventDefault();
    this.resetModal();
    console.log("entrou no btn new click");
    this.$modal.modal("show");
  },
  resetModal: function resetModal() {
    $("[data-form-register-alert]").addClass("sr-only");
    $("[data-form-register-alert]").removeClass("alert-success");
    $("[data-type-id]").val("");
    $("[data-type-title]").val("");
    $("[data-type-description]").val("");
    $("[data-type-title]").removeClass("is-invalid");
    $("[data-type-description]").removeClass("is-invalid");
    $("[data-btn-confirm]").prop("disabled", false);
  },
  onBtnEditClick: function onBtnEditClick(event) {
    event.preventDefault();
    var $btn = $(event.currentTarget);
    var id = $.trim($btn.data("id"));
    var name = $.trim($btn.data("name"));
    var description = $.trim($btn.data("description"));
    this.$id.val(id);
    this.$title.val(name);
    this.$description.val(description);
    this.$modal.modal("show");
  },
  onBtnDestroyClick: function onBtnDestroyClick(event) {
    var _this = this;

    event.preventDefault();
    swal({
      title: "Tem certeza?",
      text: "Uma vez deletada, não poderá recuperar o tipo de imagem!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(function (willDelete) {
      if (willDelete) {
        var $btn = $(event.currentTarget);
        var id = $.trim($btn.data("id"));
        $.ajax({
          url: "/tipo-de-imagem/destroy/".concat(id),
          type: "DELETE",
          data: {
            _token: _this.token
          },
          success: function success(data) {
            if (data.success) {
              $("[data-btn-confirm]").prop("disabled", true);
              $("[data-form-register-alert]").addClass("alert-success");
              $("[data-form-register-alert]").text("Tipo de imagem deletada com sucesso!");
              $("[data-form-register-alert]").removeClass("sr-only");
              window.setTimeout(function () {
                $("[data-type-modal]").modal("hide");
              }, 2000);
              ImageTypes.$datatable.ajax.reload().desc;
              return;
            }
          }
        });
        swal("Pronto! O tipo de imagem foi deletado com sucesso!", {
          icon: "success"
        });
      } else {
        swal("Você escolheu cancelar a exclusão!");
      }
    });
  },
  onEditSubmit: function onEditSubmit() {
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
      var edit = $.ajax({
        method: "PUT",
        url: "/tipo-de-imagem/update/".concat(this.$id.val()),
        ontentType: "application/json",
        data: {
          _token: this.token,
          title: this.$title.val(),
          description: this.$description.val()
        }
      });
      edit.done($.proxy(this.onEditSuccess, this));
      edit.fail($.proxy(this.oneditFail, this));
    }
  },
  onEditSuccess: function onEditSuccess(data) {
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
  oneditFail: function oneditFail(error) {
    console.log(error);
  }
};

var Contact = function Contact() {
  Contacts.start();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Contact);
/******/ })()
;