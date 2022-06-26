<template>
  <div>
    <!-- <b-card bg-variant="light"> -->
    <div class="row m-3">
      <div class="col-12">
        <div class="row">
          <div
            v-for="(ele, index) in arrPlace"
            :key="index"
            class="col-sm-4"
          >
            <b-card-group deck>
              <b-card
                border-variant="light"
                tag="article"
                style="max-width: 20rem"
                class="mb-2"
              >
                <div class="col-12">
                  <div class="row">
                    <div class="col-md-3 p-0">
                      <b-card-img
                        width="50"
                        height="40"
                        :src="ele.profile_image_url"
                        alt="Image"
                        class="rounded d-block"
                      />
                    </div>
                    <div class="col-md-9">
                      <b-card-title class="mb-0">
                        <router-link
                          :to="{
                            name: 'placeDetail',
                            params: { id: ele.id, data: ele },
                          }"
                        > <span class="text-dark">{{ ele.name }}</span></router-link>
                      </b-card-title>

                      <div class="row">
                        <div class="col-9 pr-0">
                          <feather-icon
                            size="14"
                            icon="CalendarIcon"
                          />
                          <span
                            class="font"
                          >
                            {{ format(ele.operation_time) }}
                          </span>
                        </div>
                        <div class="col-3 text-right pr-0">
                          <b-icon
                            icon="circle-fill"
                            font-scale="1"
                          /> <span class="badge bg-info font text-light"> {{ ele.rating }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div
                      v-for="(img, index) in ele.images"
                      :key="index"
                      class="col-md-4 p-0"
                    >
                      <b-card-img
                        width="50"
                        height="50"
                        :src="img"
                        alt="Image"
                        class="rounded d-block"
                      />
                    </div>

                  </div>
                </div>
              </b-card>
            </b-card-group>
          </div>
        </div>
      </div>

    </div>
    <!-- </b-card> -->
  </div>
</template>
<script>
import {
  BCard, BCardGroup, BCardTitle, BCardImg,
  // BCarousel,
  // BCarouselSlide,
  BIcon,
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
    // BCarousel,
    // BCarouselSlide,
    BIcon,

  },
  data() {
    return {
      hide: false,
      arrPlace: data,
      slide: 0,
      sliding: null,
    }
  },
  created() {

  },
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
          if (element.time_open === 'closed' || element.time_close === 'closed') {
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
        .get(`${directionsApi}`,
          {
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

<style>
.font {
  font-size: xx-small;
}

</style>
