<template>
  <div class="page">
    <!-- Header (fixed at the top) -->
    <header class="header">
      <div class="header__logo">
        <NuxtImg
          src="https://axeptio.imgix.net/2024/11/36e751b4-6599-44b1-a55a-99a34efebada.png?auto=format&fit=crop&w=35&h=auto&dpr=2"
          alt="Rijksmuseum logo"
        />
      </div>
      <div class="header__search">
        <input
          v-model="searchInput"
          class="header__search-input"
          type="text"
          placeholder="Search"
        >
        <button
          class="header__search-button"
          @click="searchArtworks"
        >
          Submit
        </button>
      </div>
      <label class="header__toggle">
        <input
          v-model="isSquare"
          type="checkbox"
        >
        <span class="header__toggle-slider" />
      </label>
    </header>

    <!-- Main content -->
    <main class="main">
      <div
        class="gallery"
        :class="{ 'gallery--square': isSquare }"
      >
        <div class="gallery__wrapper">
          <div class="gallery__grid">
            <ImageTile
              v-for="(art, index) in items"
              :key="index"
              class="gallery__item"
              :url="art.webImage.url.replace(/=s0$/, '=s696')"
              :title="art.title"
              :square-tile="isSquare"
            />

            <template v-if="status === 'pending'">
              <ImageTile
                v-for="n in pageSize"
                :key="n"
              />
            </template>
          </div>
          <div
            v-if="items.length === 0 && status === 'success'"
            class="gallery__no-results"
          >
            No results found.
          </div>
        </div>
      </div>

      <!-- Load more button -->
      <button
        v-if="items.length < totalCount"
        class="button button--load-more"
        @click="loadMore"
      >
        Load more
      </button>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { public: { apiBaseUrl, apiKey } } = useRuntimeConfig()

const totalCount = ref<number>(0)
const items = ref([])
const searchInput = ref<string>('')
const searchQuery = ref<string>('')
const page = ref<number>(1)
const pageSize = 20

const isSquare = ref(true)

const { status } = await useFetch(`${apiBaseUrl}`, {
  query: {
    key: apiKey,
    p: page,
    ps: pageSize,
    imgonly: true,
    q: searchQuery,
  },

  onResponse({ request, response, options }) {
    console.log('Request:', request)
    console.log('Response:', response)
    console.log('Options:', options)

    totalCount.value = response._data.count
    items.value = [...items.value, ...response._data.artObjects]
  },

})

function searchArtworks() {
  page.value = 1
  searchQuery.value = searchInput.value
  items.value = []
}

const loadMore = () => page.value++
</script>

<style lang="scss" scoped>
/* Variables */
$primary-color: #333;
$background-color: #eee;
$button-color: #ddd;
$button-hover-color: #ccc;

/* Global page styles */
.page {
  margin: 0 auto;
  font-family: sans-serif;
  color: $primary-color;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: $background-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  z-index: 10;

  &__logo {
    font-size: 1.2rem;
    font-weight: bold;
  }

  &__search {
    display: flex;
    gap: 5px;
  }

  &__search-input {
    padding: 5px;
    border: 1px solid $primary-color;
    border-radius: 4px;
  }

  &__search-button {
    background-color: $button-color;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: $button-hover-color;
    }
  }
  &__toggle {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
    margin-left: 15px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    &-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $button-color;
      border-radius: 28px;
      transition: background-color 0.4s;
      &:before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        border-radius: 50%;
        transition: transform 0.4s;
      }
    }
    input:checked + .header__toggle-slider {
      background-color: $button-hover-color;
    }
    input:checked + .header__toggle-slider:before {
      transform: translateX(22px);
    }
  }
}

/* Main Content */
.main {
  margin-top: 60px;
  padding: 20px;
}

/* Gallery Block */
.gallery {
  &__wrapper {
    max-width: 1800px;    // Limit the overall gallery width
    margin: 0 auto;       // Center the gallery horizontally
    padding: 0 10px;      // Provide some horizontal breathing room
  }

  &__grid {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 1fr); // Mobile-first: 2 columns (20 tiles => 10 rows)

    @media screen and (min-width: 900px) {
      grid-template-columns: repeat(5, 1fr); // Larger screens: 5 columns (20 tiles => 4 rows)
    }
  }

  &__item {
    position: relative;
    background-color: #e4e4e4;
    cursor: pointer;
  }

  &__no-results {
    text-align: center;
    color: $primary-color;
    font-size: 1.2rem;
    margin-top: 20px;
  }

  &--square {
    /* Force all images to a squared container */
    & .gallery__image-wrapper {
      height: 0;
      padding-bottom: 100%; /* Creates a square ratio */
    }

    /* Ensure images fill the square container */
    & .gallery__image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

/* Button */
.button {
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 4px;

  &--load-more {
    background: $button-color;
    display: block;         // Make it a block-level element
    margin: 20px auto;      // Center horizontally

    &:hover {
      background: $button-hover-color;
    }
  }
}
</style>
