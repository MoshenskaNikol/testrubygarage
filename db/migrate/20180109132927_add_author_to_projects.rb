class AddAuthorToProjects < ActiveRecord::Migration[5.1]
  def change
    add_reference :projects, :user, index: true
  end
end
