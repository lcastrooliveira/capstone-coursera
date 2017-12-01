module ThingsHelper
  include ModelsHelper
  def restrict_notes? user_roles
    user_roles.empty? && !is_admin?
  end
end
