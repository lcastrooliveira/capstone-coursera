module OfferingsHelper
  include ModelsHelper

  def restrict_owner? user_roles
    user_roles.empty? && !user_roles.include?(Role::ORGANIZER) && !is_admin?
  end
end
