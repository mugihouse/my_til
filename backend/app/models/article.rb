class Article < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :publish_day, presence: true
end
