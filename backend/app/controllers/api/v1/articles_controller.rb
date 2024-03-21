class Api::V1::ArticlesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    articles = Article.all
    articles_hash = build_articles_array(articles)
    render json: articles_hash, status: :ok
  end

  def create
    article = current_api_v1_user.articles.new(article_params)
    article.publish_day = Time.zone.now

    if article.save
      render  status: :ok
    else
      render json: { message: '保存出来ませんでした', errors: article.errors.messages }, status: :bad_request
    end
  end

  def edit
    article = Article.find(params[:id])
    if article
      article_hash = {
        id: article.id,
        title: article.title,
        content: article.content,
      }
      render json: article_hash, status: :ok
    end
  end

  def update
    article = Article.find(params[:id])

    if article.update(article_params)
      render  status: :ok
    else
      render json: { message: '更新出来ませんでした', errors: article.errors.messages }, status: :bad_request
    end
  end


  def show
    article = Article.find(params[:id])
    if article
      article_hash = {
        id: article.id,
        title: article.title,
        content: article.content,
      }
      render json: article_hash, status: :ok
    end
  end

  private

  def article_params
    params.permit(:title, :content)
  end

  def build_articles_array(articles)
    articles.map do |article|
      {
        id: article.id,
        title: article.title,
        content: article.content,
      }
    end
  end
end
