class Api::V1::ArticlesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def create
    article = current_api_v1_user.articles.new(article_params)
    article.publish_day = Time.zone.now

    if article.save
      render  status: :ok
    else
      render json: { message: '保存出来ませんでした', errors: article.errors.messages }, status: :bad_request
    end
  end

  private

  def article_params
    params.permit(:title, :content)
  end
end
