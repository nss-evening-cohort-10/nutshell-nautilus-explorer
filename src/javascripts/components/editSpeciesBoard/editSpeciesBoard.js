const editSpeciesModal = (species) => {
  const domString = `
  <div class="modal fade" id="upSpecies" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Species</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="edit-species-name">Species Name</label>
            <input type="text" class="form-control" id="edit-species-name" value="${species.name ? species.name : ''}" placeholder="Edit Name">
          </div>
          <div class="form-group">
            <label for="edit-species-description">Species Description</label>
            <input type="text" class="form-control" id="edit-species-description" value="${species.image ? species.image : ''}" placeholder="Edit Species Description">
          </div>
          <div class="form-group">
            <label for="edit-species-image">Species Image</label>
            <input type="text" class="form-control" id="edit-species-image" value="${species.description ? species.description : ''}" placeholder="Edit Species Image">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="update-species">Save changes</button>
      </div>
    </div>
  </div>
  </div>
  </div>
  `;
  return domString;
};


export default { editSpeciesModal };
