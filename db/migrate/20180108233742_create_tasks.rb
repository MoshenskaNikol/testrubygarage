class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.boolean :status, default: false
      t.belongs_to :project, index: true

      t.timestamps
    end
  end
end
