# Offerings Controller
class OfferingsController < ApplicationController
  wrap_parameters :offering, include: ["title", "thing_id", "desc", "owner"]
  before_action :set_offering, only: [:show, :update, :destroy]
  # before_action :set_thing, only: [:show, :update, :destroy]

  def index
    @offerings = Offering.all
  end

  def create
    @offering = Offering.new(offering_params.merge(thing_id: params[:thing_id]))

    if @offering.save
      render :show, status: :created, location: thing_offering_path(@offering.thing_id, @offering)
    else
      render json: { errors: @offering.errors.messages }, status: :unprocessable_entity
    end
  end

  def show; end

  def update
    if @offering.update(offering_params)
      head :no_content
    else
      render json: { errors: @offering.errors.messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @offering.destroy
    head :no_content
  end

  private

  def set_offering
    @offering = Offering.find(params[:id])
  end

  def offering_params
    params.require(:offering).tap do |p|
      p.require(:title)
      p.require(:desc)
      p.require(:owner)
    end.permit(:title, :desc, :owner, :thing_id)
  end
end
