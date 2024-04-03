class Api::V1::ArticlesController < ApplicationController
  include Pagination
  before_action :authenticate_api_v1_user!, except: :index

  def index
    articles = Article.all.includes(:user).order(created_at: :desc)
    #ページネーション指定ページ
    paged = params[:paged]
    #指定がない場合はデフォルトを10ページずつ（kaminari標準のlimit_valueは25）
    per = params[:per].present? ? params[:per] : 10
    #ページネーションが適用された投稿
    articles_paginated = articles.page(paged).per(per)
    pagination = pagination(articles_paginated)
    articles_hash = build_articles_array(articles_paginated)
    render json: {articles: articles_hash, pagination: pagination}, status: :ok
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

  def destroy
    article = Article.find(params[:id])
    article.destroy!
    render status: :ok
  end

  def month_data
    date = Date.parse(params[:date])
    month_articles = current_api_v1_user.articles.where(publish_day: (date..date.next_month))
    month_articles_hash = month_articles.map do |article|
      {
        id: article.id,
        title: article.title,
        start: article.publish_day,
        allDay: true,
      }
    end
    render json: month_articles_hash, status: :ok
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
        name: article.user.name
      }
    end
  end
end
