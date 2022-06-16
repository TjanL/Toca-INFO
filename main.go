package main

import (
	"fmt"
	"net/http"
	"os"
	"regexp"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/mmcdole/gofeed"
)

var (
	pokrajne = [...]string{
		"BELOKRANJSKA",
		"BOVSKA",
		"DOLENJSKA",
		"GORENJSKA",
		"GORISKA",
		"KOCEVSKA",
		"KOROSKA",
		"OSREDNJESLOVENSKA",
		"NOTRANJSKO-KRASKA",
		"OBALNO-KRASKA",
		"PODRAVSKA",
		"POMURSKA",
		"SAVINJSKA",
		"SPODNJEPOSAVSKA",
		"ZGORNJESAVSKA",
	}
	url = "https://www.meteo.si/uploads/probase/www/warning/text/sl/warning_hp_SI_%s_latest.rss"
)

type Status struct {
	Date   string
	Status int
}

func getReport() map[string]Status {
	r, _ := regexp.Compile("stopnja ([0-3])")
	fp := gofeed.NewParser()
	report := make(map[string]Status)

	for _, pokrajna := range pokrajne {
		feed, _ := fp.ParseURL(fmt.Sprintf(url, pokrajna))

		item := feed.Items[0]
		stopnja, _ := strconv.Atoi(r.FindString(item.Title))

		report[pokrajna] = Status{feed.Published, stopnja}
	}

	return report
}

func main() {
	r := gin.Default()

	r.GET("/api/status", func(c *gin.Context) {
		c.JSON(http.StatusOK, getReport())
	})

	port := ":8080"
	if val, ok := os.LookupEnv("FUNCTIONS_CUSTOMHANDLER_PORT"); ok {
		port = ":" + val
	}
	r.Run(port)
}
