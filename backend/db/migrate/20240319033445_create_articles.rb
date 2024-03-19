class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :content
      t.column :publish_day, 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'

      t.timestamps
    end
  end
end
