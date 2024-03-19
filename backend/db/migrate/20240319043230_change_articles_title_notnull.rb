class ChangeArticlesTitleNotnull < ActiveRecord::Migration[7.0]
  def change
    change_column_null :articles, :title, false
  end
end
