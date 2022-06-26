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
                          /> <span class="font text-info"> {{ ele.rating }}</span>
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
                    <!-- <b-carousel
                      id="carousel-1"
                      v-model="slide"
                      :class="{'col-md-12': hide, ' col-xs-12': !hide}"
                      :interval="4000"
                      controls
                      indicators
                      background="#ababab"
                      img-width="1024"
                      img-height="480"
                      style="text-shadow: 1px 1px 2px #333;"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd"
                    >

                      <b-carousel-slide
                        caption="First slide"
                        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                        img-src="https://picsum.photos/1024/480/?image=52"
                      />

                      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
                        <h1>Hello world!</h1>
                      </b-carousel-slide>

                      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58" />

                      <b-carousel-slide>
                        <template #img>
                          <img
                            class="d-block img-fluid w-100"
                            width="1024"
                            height="480"
                            src="https://picsum.photos/1024/480/?image=55"
                            alt="image slot"
                          >
                        </template>
                      </b-carousel-slide>

                      <b-carousel-slide
                        caption="Blank Image"
                        img-blank
                        img-alt="Blank image"
                      >
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
                        </p>
                      </b-carousel-slide>
                    </b-carousel> -->
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
      arrPlace: [],
      slide: 0,
      sliding: null,
    }
  },
  created() {
    this.dataPlace()
  },
  methods: {
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    },
    dataPlace() {
      this.arrPlace = data
      console.log(this.arrPlace)
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
    // getPageList(totalPages, page, maxLength) {
    //   function range(start, end) {
    //     return Array.from(Array(end - start + 1), (_, i) => i + start)
    //   }

    //   const sideWidth = maxLength < 9 ? 1 : 2
    //   const leftWidth = (maxLength - sideWidth * 2 - 3) > 1
    //   const rightWidth = (maxLength - sideWidth * 2 - 3) > 1

    //   if (totalPages <= maxLength) {
    //     return range(1, totalPages)
    //   }

    //   if (page <= maxLength - sideWidth - 1 - rightWidth) {
    //     return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages))
    //   }

    //   if (page >= totalPages - sideWidth - 1 - rightWidth) {
    //     return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages))
    //   }

    //   return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages))
    // },
    // pages() {
    //   const numberOfItems = $('.card-content .card').length
    //   const limitPerPage = 3 // How many card items visible per a page
    //   const totalPages = Math.ceil(numberOfItems / limitPerPage)
    //   const paginationSize = 7 // How many page elements visible in the pagination
    //   let currentPage

    //   function showPage(whichPage) {
    //     if (whichPage < 1 || whichPage > totalPages) return false

    //     currentPage = whichPage

    //     $('.card-content .card').hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show()

    //     $('.pagination li').slice(1, -1).remove()

    //     getPageList(totalPages, currentPage, paginationSize).forEach(item => {
    //       $('<li>').addClass('page-item').addClass(item ? 'current-page' : 'dots')
    //         .toggleClass('active', item === currentPage)
    //         .append($('<a>').addClass('page-link')
    //           .attr({ href: 'javascript:void(0)' }).text(item || '...'))
    //         .insertBefore('.next-page')
    //     })

    //     $('.previous-page').toggleClass('disable', currentPage === 1)
    //     $('.next-page').toggleClass('disable', currentPage === totalPages)
    //     return true
    //   }
    // },
    getData() {
      const directionsApi = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=13.779820829768585, 100.54464812602707&radius=1500&type=restaurant&key=AIzaSyBJKStkkIpjK2_fOy33qPGPGjWc0fEw4s0'
      axios
        .get(`${directionsApi}`,
          {
            // headers: {
            //   'Content-Type': 'application/json',
            //   // 'Access-Control-Allow-Origin': '*',
            //   // 'Access-Control-Allow-Methods': 'GET',
            //   // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            // },
            // params: {
            //   keyword: '',
            //   location: '13.779820829768585, 100.54464812602707',
            //   radius: '1500',
            //   type: 'restaurant',
            //   key: 'AIzaSyBz6wEy1Cdziy8NOubjUtotbNqBuZ5VsD8',
            // },
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
