package main

import (
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// データベースの接続設定
var db *gorm.DB

// 商品テーブルの構造体
type Syohin struct {
	SyohinCode  string `json:"syohin_code" gorm:"primaryKey"`
	SyohinName  string `json:"syohin_name"`
	Price       int    `json:"price"`
	SyohinType  bool   `json:"syohin_type"`
	Category    int    `json:"category"`
	SubCategory int    `json:"sub_category"`
	// CategoryName    string `json:"category_name"`
	// SubCategoryName string `json:"sub_category_name"`
	StockUnit    string `json:"stock_unit"`
	SafetyStock  int    `json:"safety_stock"`
	ReorderPoint int    `json:"reorder_point"`
	Note         string `json:"note"`
	Is_active    bool   `json:"is_active"`
}

// GORM のテーブル名を `syohin` に固定
func (Syohin) TableName() string {
	return "syohin"
}

func connectDB() {
	// .env ファイルを読み込む
	err := godotenv.Load()
	if err != nil {
		logrus.Warn("No .env file found")
	}

	// 環境変数からDB接続情報を取得
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		logrus.Fatal("DATABASE_URL is not set")
	}

	// GORM を使って PostgreSQL に接続
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		logrus.Fatalf("Failed to connect to database: %v", err)
	}

	logrus.Info("Connected to the database successfully!")
}

func main() {
	// データベース接続
	connectDB()

	// Echo インスタンスを作成
	e := echo.New()

	// ミドルウェアの適用
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
	}))

	// `/ping` エンドポイント
	e.GET("/ping", func(c echo.Context) error {
		return c.String(http.StatusOK, "pongあああああ")
	})

	// `/db_check` エンドポイント（DB接続確認用）
	e.GET("/db_check", func(c echo.Context) error {
		sqlDB, err := db.DB()
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to get database instance"})
		}
		err = sqlDB.Ping()
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Database connection failed"})
		}
		return c.JSON(http.StatusOK, map[string]string{"message": "Database connected!"})
	})
	// `/syohin` エンドポイント（`syohin` テーブルのデータ取得）
	e.GET("/syohin", func(c echo.Context) error {
		var syohinList []Syohin
		result := db.Find(&syohinList)
		if result.Error != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch syohin data"})
		}
		return c.JSON(http.StatusOK, syohinList)
	})
	// サーバーを起動
	e.Logger.Fatal(e.Start(":8080"))
}
