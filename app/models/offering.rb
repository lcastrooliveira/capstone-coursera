# Offering
class Offering < ActiveRecord::Base
  validates :title, :desc, :owner, presence: true
  belongs_to :thing
end
