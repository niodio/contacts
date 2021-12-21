<div class="modal" id="delete-modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Contact?</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete the contact?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

        
                <form action="{{ route('contacts.delete', $contact->id) }}" method="get">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal"><i
                            class="far fa-trash-alt"></i></button>
                </form>
            </div>
        </div>
    </div>
</div>
