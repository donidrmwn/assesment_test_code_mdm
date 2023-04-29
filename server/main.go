package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sort"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Result struct {
	Data interface{} `json:"data"`
}

type ErrorResult struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type ProvinsiStruct struct {
	Id    int       `json:"id"`
	Nama  string    `json:"nama"`
	Dapil []float64 `json:"dapil"`
}

type PartaiStruct struct {
	Id          int     `json:"id"`
	Warna       string  `json:"warna"`
	IsAceh      bool    `json:"is_aceh"`
	IdPilihan   float64 `json:"id_pilihan"`
	NomorUrut   float64 `json:"nomor_urut"`
	Nama        string  `json:"nama"`
	NamaLengkap string  `json:"nama_lengkap"`
}

func main() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PATCH, echo.DELETE, echo.POST},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.GET("/table", getTable)
	e.GET("/chart", getChart)
	e.GET("/provinsi", getProvinsi)
	e.GET("/partai", getPartai)

	e.Logger.Fatal(e.Start(":"))
	fmt.Println("server running")
}

func getTable(c echo.Context) error {

	content, err := ioutil.ReadFile("./dprri.json")
	if err != nil {
		return c.JSON(http.StatusBadRequest, ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	var payload map[string]interface{}
	err = json.Unmarshal(content, &payload)
	if err != nil {
		return c.JSON(http.StatusBadRequest, ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, Result{
		Data: payload["table"],
	})
}

func getChart(c echo.Context) error {

	content, err := ioutil.ReadFile("./dprri.json")
	if err != nil {
		return c.JSON(http.StatusBadRequest, ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	var payload map[string]interface{}
	err = json.Unmarshal(content, &payload)
	if err != nil {
		return c.JSON(http.StatusBadRequest, ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, Result{
		Data: payload["chart"],
	})
}

func getProvinsi(c echo.Context) error {
	content, err := ioutil.ReadFile("./0.json")
	if err != nil {
		return c.JSON(http.StatusBadRequest, ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	var payload map[string]interface{}
	err = json.Unmarshal(content, &payload)

	if err != nil {
		return c.JSON(http.StatusBadRequest, ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	var Provinsi []ProvinsiStruct
	for key, value := range payload {
		keyInt, _ := strconv.Atoi(key)
		var Dapil []float64
		Nama := value.(map[string]interface{})["nama"].(string)
		for _, value := range value.(map[string]interface{})["dapil"].([]interface{}) {

			Dapil = append(Dapil, value.(float64))
		}
		Provinsi = append(Provinsi, ProvinsiStruct{
			Id:    keyInt,
			Nama:  Nama,
			Dapil: Dapil,
		})
	}
	sort.Slice(Provinsi[:], func(i, j int) bool {
		return Provinsi[i].Id < Provinsi[j].Id
	})

	return c.JSON(http.StatusOK, Result{
		Data: Provinsi,
	})
}
func getPartai(c echo.Context) error {

	content, err := ioutil.ReadFile("./partai.json")
	if err != nil {
		return c.JSON(http.StatusBadRequest, ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	var payload map[string]interface{}
	err = json.Unmarshal(content, &payload)
	if err != nil {
		return c.JSON(http.StatusBadRequest, ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	var Partai []PartaiStruct
	for key, value := range payload {
		keyInt, _ := strconv.Atoi(key)

		Warna := value.(map[string]interface{})["warna"].(string)
		IsAceh := value.(map[string]interface{})["is_aceh"].(bool)
		IdPilihan := value.(map[string]interface{})["id_pilihan"].(float64)
		NomorUrut := value.(map[string]interface{})["nomor_urut"].(float64)
		Nama := value.(map[string]interface{})["nama"].(string)
		NamaLengkap := value.(map[string]interface{})["nama_lengkap"].(string)

		Partai = append(Partai, PartaiStruct{
			Id:          keyInt,
			Warna:       Warna,
			IsAceh:      IsAceh,
			IdPilihan:   IdPilihan,
			NomorUrut:   NomorUrut,
			Nama:        Nama,
			NamaLengkap: NamaLengkap,
		})
	}

	sort.Slice(Partai[:], func(i, j int) bool {
		return Partai[i].Id < Partai[j].Id
	})

	return c.JSON(http.StatusOK, Result{
		Data: Partai,
	})

}
