class ItemsController < ApplicationController
  before_action :load_item, only: [:show, :update, :destroy]
  respond_to :json

  def index
    @items = Item.all
    json_response @items
  end

  def show
    json_response @item
  end

  def create
    @item = Item.create!(item_params)
    head :created
  end

  def update
    @item.update!(item_params)
    head :no_content
  end

  def destroy
    @item.destroy
    head :no_content
  end

  private

  def item_params
    params.require(:item).permit(:name, :price, :_item_type)
  end

  def load_item
    @item = Item.find(params[:id])
  end
end
