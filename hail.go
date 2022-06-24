package main

import (
	"fmt"
	"regexp"
	"strconv"
	"time"

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

type HailData struct {
	UpdateTime time.Time
	Data       map[string]Status
	interval   time.Duration
}

func NewHailData(interval int64) *HailData {
	return &HailData{interval: time.Duration(interval * int64(time.Minute))}
}

func (ha *HailData) Update() {
	r, _ := regexp.Compile("stopnja ([0-3])")
	fp := gofeed.NewParser()
	report := make(map[string]Status)

	for _, pokrajna := range pokrajne {
		feed, _ := fp.ParseURL(fmt.Sprintf(url, pokrajna))

		item := feed.Items[0]
		stopnja, _ := strconv.Atoi(r.FindStringSubmatch(item.Title)[1])

		report[pokrajna] = Status{feed.Published, stopnja}
	}

	ha.UpdateTime = time.Now()
	ha.Data = report
}

func (ha *HailData) IsStale() bool {
	return time.Now().After(ha.UpdateTime.Add(ha.interval))
}
