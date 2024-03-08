class Api::V1::HomeController < ApplicationController
  before_action :authenticate_api_v1_user!

  # 疎通確認
  def index
    render json: { message: 'hello' }
  end
end
