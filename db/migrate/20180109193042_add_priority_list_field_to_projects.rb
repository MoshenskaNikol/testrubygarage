class AddPriorityListFieldToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :priority, :text, default: '[]'
  end
end
