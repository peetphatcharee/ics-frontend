<template>
  <div>
    <b-card class="cards">
      <div class="row m-0">
        <!-- <div class="col-md-12">
          <b-form-group
            id="btn"
            :class="{'col-md-12': hide, ' col-xs-12': !hide}"
          >
            <b-form-radio-group
              id="btn-radios-2"
              v-model="selected"
              :class="{'col-md-3': hide, ' col-xs-12': !hide}"
              :options="options"
              button-variant="primary"
              name="radio-btn-outline"
              class="col-xs-12"
              buttons
              @change="showHideDiv(selected)"
            />
          </b-form-group>
        </div> -->

        <div
          id="infomation"
          class="col-md-6"
        >
          <b-card
            v-for="(ele, index) in detailArr"
            :key="index"
            :img-src="ele.profile_image_url"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 50rem;"
            class="mb-2"
          >

            <div class="row">
              <div class="col-9">
                <b-card-title>
                  {{ ele.name }}
                </b-card-title>
              </div>
              <div class="col-3 text-right">
                <b-icon
                  icon="circle-fill"
                  font-scale="1"
                /><span class="badge bg-info font text-light"> {{ ele.rating }}</span>

              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <h5>Address :</h5>
              </div>
              <div class="col-md-8">
                {{ ele.address }}
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-4">
                <h5>Opening Hour:</h5>
              </div>
              <div
                class="col-md-8"
              >
                <div
                  v-for="(item, index) in ele.operation_time"
                  :key="index"
                  class="row ml-0"
                >
                  {{ formatTime(item) }}
                </div>

              </div>
            </div>
          </b-card>

        </div>

        <div
          id="img"
          class="col-md-6"
        >
          <b-card
            v-for="(ele, index) in detailArr"
            :key="index"
            border-variant="light"
            tag="article"
            style="max-width: 50rem"
            class="mb-2"
          >
            <b-card-title>
              Images
            </b-card-title>
            <b-card-img
              v-for="(img, index) in ele.images"
              :key="index"
              :src="img"
              alt="Image"
              class="rounded-0"
            />
          </b-card>
        </div>

      </div>
    </b-card>
  </div>
</template>
<script>
import {
  BCard,
  // BCardGroup,
  BCardTitle,
  BCardImg,
  // BFormGroup,
  // BFormRadioGroup,
  BIcon,
  //  BCarousel,
  //  BCarouselSlide,
} from 'bootstrap-vue'
import axios from 'axios'
import data from '../data/example_data.json'
// import Swal from 'sweetalert2'
// import useJwt from '../auth/jwt/useJwt'

export default {
  components: {
    BCard,
    // BCardGroup,
    // BFormRadioGroup,
    BCardTitle,
    BCardImg,
    // BFormGroup,
    BIcon,
    // BCarousel,
    // BCarouselSlide,

  },
  data() {
    return {
      hide: false,
      arrPlace: data,
      slide: 0,
      sliding: null,
      id: this.$route.params.id,
      detailArr: [],
      options: [
        { text: 'INFORMATION', value: '1' },
        { text: 'IMAGE', value: '2' },

      ],
      selected: '',
    }
  },
  created() {
    this.detail()
  },
  methods: {
    showHideDiv(id) {
      console.log(id)
      if (id === '1') {
        document.getElementById('img').style.display = 'none'
        document.getElementById('infomation').style.display = 'block'
      }
      if (id === '2') {
        document.getElementById('img').style.display = 'block'
        document.getElementById('infomation').style.display = 'none'
      }
    },
    formatTime(item) {
      if (item.time_open === 'closed' || item.time_close === 'closed') {
        return `${item.day}: ${item.time_close}`
      }
      return `${item.day}: ${item.time_open} AM - ${item.time_close} PM`
    },
    detail() {
      // eslint-disable-next-line radix
      const num = parseInt(this.id)
      const arrData = []
      this.arrPlace.forEach(e => {
        if (e.id === num) {
          arrData.push(e)
        }
      })
      this.detailArr = arrData
      console.log(arrData)
    },
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    },
    // dataPlace() {
    //   this.arrPlace = data
    // },
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
.cards {
  background-color: #C4D3E9;
}
.img {
  max-height: 10rem;
}
</style>
