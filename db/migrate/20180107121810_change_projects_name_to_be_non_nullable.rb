class ChangeProjectsNameToBeNonNullable < ActiveRecord::Migration[5.1]
  def change
    change_column :projects, :name, :string, null: false
  end
end
