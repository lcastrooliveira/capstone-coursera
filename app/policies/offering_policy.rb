class OfferingPolicy < ApplicationPolicy

  def index?
    @user
  end

  def show?
    @user
  end

  def create?
    # Proxy permission to Thing Policy
    ThingPolicy.new(@user, Thing).create?

  end

  def update?
    Pundit.policy(@user, @record.thing).organizer?
  end

  def destroy?
    Pundit.policy(@user, @record.thing).organizer_or_admin?
  end

  class Scope < Scope
    def user_roles
      joins_clause=["left join Roles r on r.mname='Thing'",
                    "r.mid=Offerings.thing_id",
                    "r.user_id #{user_criteria}"].join(" and ")
      scope.select("Offerings.*, r.role_name").joins(joins_clause)
    end

    def resolve
      user_roles
    end
  end
end
