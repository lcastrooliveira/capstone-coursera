json.extract! offering, :id, :thing_id, :title, :desc, :created_at, :updated_at
json.owner offering.owner unless restrict_owner? offering.user_roles
json.user_roles offering.user_roles unless offering.user_roles.empty?
