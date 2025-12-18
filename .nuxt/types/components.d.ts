
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  'AboutUsSection': typeof import("../../components/AboutUsSection.vue").default
  'ApartmentCard': typeof import("../../components/ApartmentCard.vue").default
  'ApartmentPlanCard': typeof import("../../components/ApartmentPlanCard.vue").default
  'ApartmentSelectionSection': typeof import("../../components/ApartmentSelectionSection.vue").default
  'BreadcrumbsSection': typeof import("../../components/BreadcrumbsSection.vue").default
  'BuyApartmentHeroSection': typeof import("../../components/BuyApartmentHeroSection.vue").default
  'CTAButtonSection': typeof import("../../components/CTAButtonSection.vue").default
  'CallbackFormSection': typeof import("../../components/CallbackFormSection.vue").default
  'CompactHeader': typeof import("../../components/CompactHeader.vue").default
  'ComparisonTableSection': typeof import("../../components/ComparisonTableSection.vue").default
  'CompletedProjects': typeof import("../../components/CompletedProjects.vue").default
  'ContactSection': typeof import("../../components/ContactSection.vue").default
  'CurrentProjects': typeof import("../../components/CurrentProjects.vue").default
  'DagestanStonesSection': typeof import("../../components/DagestanStonesSection.vue").default
  'DocumentSection': typeof import("../../components/DocumentSection.vue").default
  'EcocitySection': typeof import("../../components/EcocitySection.vue").default
  'FAQSection': typeof import("../../components/FAQSection.vue").default
  'FavoritePlanCard': typeof import("../../components/FavoritePlanCard.vue").default
  'FavoriteSearchPanel': typeof import("../../components/FavoriteSearchPanel.vue").default
  'FeaturesSection': typeof import("../../components/FeaturesSection.vue").default
  'FindPlansCard': typeof import("../../components/FindPlansCard.vue").default
  'FloatingActionBar': typeof import("../../components/FloatingActionBar.vue").default
  'FloatingActionBarGold': typeof import("../../components/FloatingActionBarGold.vue").default
  'Footer': typeof import("../../components/Footer.vue").default
  'GallerySection': typeof import("../../components/GallerySection.vue").default
  'Header': typeof import("../../components/Header.vue").default
  'HeroSection': typeof import("../../components/HeroSection.vue").default
  'HowToBuySection': typeof import("../../components/HowToBuySection.vue").default
  'InvestmentSection': typeof import("../../components/InvestmentSection.vue").default
  'LocationSection': typeof import("../../components/LocationSection.vue").default
  'MapSection': typeof import("../../components/MapSection.vue").default
  'MediaSection': typeof import("../../components/MediaSection.vue").default
  'Model3DViewer': typeof import("../../components/Model3DViewer.vue").default
  'MortgageAccordion': typeof import("../../components/MortgageAccordion.vue").default
  'MortgageCTABanner': typeof import("../../components/MortgageCTABanner.vue").default
  'MortgageCalculatorFigma': typeof import("../../components/MortgageCalculatorFigma.vue").default
  'MortgageCalculatorSection': typeof import("../../components/MortgageCalculatorSection.vue").default
  'MortgageFormSection': typeof import("../../components/MortgageFormSection.vue").default
  'MortgageGuideFormSection': typeof import("../../components/MortgageGuideFormSection.vue").default
  'MortgageGuideSection': typeof import("../../components/MortgageGuideSection.vue").default
  'MortgageHeroSection': typeof import("../../components/MortgageHeroSection.vue").default
  'MortgageInfoSection': typeof import("../../components/MortgageInfoSection.vue").default
  'MortgagePromoSection': typeof import("../../components/MortgagePromoSection.vue").default
  'MortgageStepsSection': typeof import("../../components/MortgageStepsSection.vue").default
  'NewsCard': typeof import("../../components/NewsCard.vue").default
  'NewsSection': typeof import("../../components/NewsSection.vue").default
  'NuxtImg': typeof import("../../components/NuxtImg.vue").default
  'PartnersSection': typeof import("../../components/PartnersSection.vue").default
  'PriceListSection': typeof import("../../components/PriceListSection.vue").default
  'ProgressSection': typeof import("../../components/ProgressSection.vue").default
  'ProjectDetailHero': typeof import("../../components/ProjectDetailHero.vue").default
  'ProjectsCarousel': typeof import("../../components/ProjectsCarousel.vue").default
  'PropertyFilters': typeof import("../../components/PropertyFilters.vue").default
  'PropertySelectionGrid': typeof import("../../components/PropertySelectionGrid.vue").default
  'ScrollToTopButton': typeof import("../../components/ScrollToTopButton.vue").default
  'StatsSection': typeof import("../../components/StatsSection.vue").default
  'TestimonialsSection': typeof import("../../components/TestimonialsSection.vue").default
  'VideoSection': typeof import("../../components/VideoSection.vue").default
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only").default
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
  'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default
  'LazyAboutUsSection': LazyComponent<typeof import("../../components/AboutUsSection.vue").default>
  'LazyApartmentCard': LazyComponent<typeof import("../../components/ApartmentCard.vue").default>
  'LazyApartmentPlanCard': LazyComponent<typeof import("../../components/ApartmentPlanCard.vue").default>
  'LazyApartmentSelectionSection': LazyComponent<typeof import("../../components/ApartmentSelectionSection.vue").default>
  'LazyBreadcrumbsSection': LazyComponent<typeof import("../../components/BreadcrumbsSection.vue").default>
  'LazyBuyApartmentHeroSection': LazyComponent<typeof import("../../components/BuyApartmentHeroSection.vue").default>
  'LazyCTAButtonSection': LazyComponent<typeof import("../../components/CTAButtonSection.vue").default>
  'LazyCallbackFormSection': LazyComponent<typeof import("../../components/CallbackFormSection.vue").default>
  'LazyCompactHeader': LazyComponent<typeof import("../../components/CompactHeader.vue").default>
  'LazyComparisonTableSection': LazyComponent<typeof import("../../components/ComparisonTableSection.vue").default>
  'LazyCompletedProjects': LazyComponent<typeof import("../../components/CompletedProjects.vue").default>
  'LazyContactSection': LazyComponent<typeof import("../../components/ContactSection.vue").default>
  'LazyCurrentProjects': LazyComponent<typeof import("../../components/CurrentProjects.vue").default>
  'LazyDagestanStonesSection': LazyComponent<typeof import("../../components/DagestanStonesSection.vue").default>
  'LazyDocumentSection': LazyComponent<typeof import("../../components/DocumentSection.vue").default>
  'LazyEcocitySection': LazyComponent<typeof import("../../components/EcocitySection.vue").default>
  'LazyFAQSection': LazyComponent<typeof import("../../components/FAQSection.vue").default>
  'LazyFavoritePlanCard': LazyComponent<typeof import("../../components/FavoritePlanCard.vue").default>
  'LazyFavoriteSearchPanel': LazyComponent<typeof import("../../components/FavoriteSearchPanel.vue").default>
  'LazyFeaturesSection': LazyComponent<typeof import("../../components/FeaturesSection.vue").default>
  'LazyFindPlansCard': LazyComponent<typeof import("../../components/FindPlansCard.vue").default>
  'LazyFloatingActionBar': LazyComponent<typeof import("../../components/FloatingActionBar.vue").default>
  'LazyFloatingActionBarGold': LazyComponent<typeof import("../../components/FloatingActionBarGold.vue").default>
  'LazyFooter': LazyComponent<typeof import("../../components/Footer.vue").default>
  'LazyGallerySection': LazyComponent<typeof import("../../components/GallerySection.vue").default>
  'LazyHeader': LazyComponent<typeof import("../../components/Header.vue").default>
  'LazyHeroSection': LazyComponent<typeof import("../../components/HeroSection.vue").default>
  'LazyHowToBuySection': LazyComponent<typeof import("../../components/HowToBuySection.vue").default>
  'LazyInvestmentSection': LazyComponent<typeof import("../../components/InvestmentSection.vue").default>
  'LazyLocationSection': LazyComponent<typeof import("../../components/LocationSection.vue").default>
  'LazyMapSection': LazyComponent<typeof import("../../components/MapSection.vue").default>
  'LazyMediaSection': LazyComponent<typeof import("../../components/MediaSection.vue").default>
  'LazyModel3DViewer': LazyComponent<typeof import("../../components/Model3DViewer.vue").default>
  'LazyMortgageAccordion': LazyComponent<typeof import("../../components/MortgageAccordion.vue").default>
  'LazyMortgageCTABanner': LazyComponent<typeof import("../../components/MortgageCTABanner.vue").default>
  'LazyMortgageCalculatorFigma': LazyComponent<typeof import("../../components/MortgageCalculatorFigma.vue").default>
  'LazyMortgageCalculatorSection': LazyComponent<typeof import("../../components/MortgageCalculatorSection.vue").default>
  'LazyMortgageFormSection': LazyComponent<typeof import("../../components/MortgageFormSection.vue").default>
  'LazyMortgageGuideFormSection': LazyComponent<typeof import("../../components/MortgageGuideFormSection.vue").default>
  'LazyMortgageGuideSection': LazyComponent<typeof import("../../components/MortgageGuideSection.vue").default>
  'LazyMortgageHeroSection': LazyComponent<typeof import("../../components/MortgageHeroSection.vue").default>
  'LazyMortgageInfoSection': LazyComponent<typeof import("../../components/MortgageInfoSection.vue").default>
  'LazyMortgagePromoSection': LazyComponent<typeof import("../../components/MortgagePromoSection.vue").default>
  'LazyMortgageStepsSection': LazyComponent<typeof import("../../components/MortgageStepsSection.vue").default>
  'LazyNewsCard': LazyComponent<typeof import("../../components/NewsCard.vue").default>
  'LazyNewsSection': LazyComponent<typeof import("../../components/NewsSection.vue").default>
  'LazyNuxtImg': LazyComponent<typeof import("../../components/NuxtImg.vue").default>
  'LazyPartnersSection': LazyComponent<typeof import("../../components/PartnersSection.vue").default>
  'LazyPriceListSection': LazyComponent<typeof import("../../components/PriceListSection.vue").default>
  'LazyProgressSection': LazyComponent<typeof import("../../components/ProgressSection.vue").default>
  'LazyProjectDetailHero': LazyComponent<typeof import("../../components/ProjectDetailHero.vue").default>
  'LazyProjectsCarousel': LazyComponent<typeof import("../../components/ProjectsCarousel.vue").default>
  'LazyPropertyFilters': LazyComponent<typeof import("../../components/PropertyFilters.vue").default>
  'LazyPropertySelectionGrid': LazyComponent<typeof import("../../components/PropertySelectionGrid.vue").default>
  'LazyScrollToTopButton': LazyComponent<typeof import("../../components/ScrollToTopButton.vue").default>
  'LazyStatsSection': LazyComponent<typeof import("../../components/StatsSection.vue").default>
  'LazyTestimonialsSection': LazyComponent<typeof import("../../components/TestimonialsSection.vue").default>
  'LazyVideoSection': LazyComponent<typeof import("../../components/VideoSection.vue").default>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only").default>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
