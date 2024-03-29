class Api::V1::AuthenticationsController < ApplicationController
  def authenticate
    if api_v1_user_signed_in?
      render json: {isLoggedIn: "true"}
    else
      render json: {isLoggedIn: "false"}
    end
  end
end
