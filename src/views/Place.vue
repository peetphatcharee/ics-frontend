<template>
  <div>
    <!-- <b-card bg-variant="light"> -->
    <div
      id="places"
      class="row"
    >
      <!-- <div class="col-12"> -->
      <div class="row styles">
        <div
          v-for="(ele, index) in arrPlace"
          :key="index"
          class="col-sm-4 styles"
        >
          <b-card-group deck>
            <router-link
              :to="{
                name: 'placeDetail',
                params: { id: ele.id, data: ele },
              }"
            >
              <b-card
                border-variant="light"
                tag="article"
                class="mb-2 card-body-width"
              >
                <div class="col-12">
                  <div class="row">
                    <div class="col-md-3 p-0">
                      <b-card-img
                        id="Image"
                        :src="ele.profile_image_url"
                        alt="Image"
                        class="rounded d-block"
                      />
                    </div>
                    <div class="col-md-9">
                      <b-card-title class="mb-0">
                        <!-- <router-link
                          :to="{
                            name: 'placeDetail',
                            params: { id: ele.id, data: ele },
                          }"
                        > -->
                          <span class="text-dark">{{
                            ele.name
                          }}</span>
                      </b-card-title>

                      <div class="row">
                        <div class="col-9 pr-0">
                          <feather-icon
                            size="14"
                            icon="CalendarIcon"
                          />
                          <span class="font">
                            {{ format(ele.operation_time) }}
                          </span>
                        </div>
                        <div class="pr-0 b-border b-position">
                          <span class="text-position"> {{ ele.rating }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <!-- <div class="img-w-h"> -->
                    <div
                      v-for="(img, index) in ele.images"
                      :key="index"
                      class="col-md-4 p-0 my-content-des"
                    >
                      <b-card-img
                        width="120"
                        height="80"
                        :src="img"
                        alt="Image"
                        class="rounded d-block"
                      />
                    <!-- </div> -->
                    </div>

                    <b-carousel
                      id="carousel-1"
                      v-model="slide"
                      controls
                      indicators
                      class="my-content"
                      @sliding-start="onSlideStart(index)"
                      @sliding-end="onSlideEnd(index)"
                    >
                      <div
                        v-for="(img, index) in ele.images"
                        :key="index"
                      >
                        <b-carousel-slide
                          :img-src="img"
                          width="1024"
                          height="480"
                        />
                      </div>
                    </b-carousel>
                  </div></div></b-card>
            </router-link>
          </b-card-group>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <!-- </b-card> -->
  </div>
</template>
<script>
import {
  BCard,
  BCardGroup,
  BCardTitle,
  BCardImg,
  BCarousel,
  BCarouselSlide,
  // BIcon,
} from 'bootstrap-vue'
import axios from 'axios'
import data from '../data/example_data.json'
// import Swal from 'sweetalert2'
// import useJwt from '../auth/jwt/useJwt'

export default {
  components: {
    BCard,
    BCardGroup,
    BCardTitle,
    BCardImg,
    BCarousel,
    BCarouselSlide,
    // BIcon,
  },
  data() {
    return {
      hide: false,
      arrPlace: data,
      slide: 0,
      sliding: null,
    }
  },
  created() {},
  methods: {
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    },

    format(arrTime) {
      const day = new Date().toLocaleString('en-us', { weekday: 'long' })
      let time = ''
      arrTime.forEach(element => {
        if (element.day === day) {
          if (
            element.time_open === 'closed'
            || element.time_close === 'closed'
          ) {
            time = `${element.time_close}`
          } else {
            time = `${element.time_open} AM - ${element.time_close} PM`
          }
        }
      })
      return time
    },

    getData() {
      const directionsApi = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=13.779820829768585, 100.54464812602707&radius=1500&type=restaurant&key=AIzaSyBJKStkkIpjK2_fOy33qPGPGjWc0fEw4s0'
      axios
        .get(`${directionsApi}`, {
          params: {
            keyword: '',
            location: '13.779820829768585, 100.54464812602707',
            radius: '1500',
            type: 'restaurant',
            key: 'AIzaSyBz6wEy1Cdziy8NOubjUtotbNqBuZ5VsD8',
          },
        })
        .then(response => {
          // this.responses = response.data
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          // always executed
        })
    },
  },
}
</script>
<style lang="scss">
@import "~@/assets/css/place.css";
</style>
