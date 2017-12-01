# Offering
class Offering < ActiveRecord::Base
  include Protectable
  
  validates :title, :desc, :owner, presence: true
  belongs_to :thing
end
