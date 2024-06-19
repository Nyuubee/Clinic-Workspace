import type { RoutesNamesList } from "@typed-router/__routes"

/**
 * A Composable for handling pagination
 * @param source A ref with a count property 
 * @param perPage The number of items per page
 * @param initialCurrentPage The zero-based index of the initial page
 */
export function usePagination(source: Ref<{
        count: number
    }>, perPage:number, initialCurrentPage = 0) {
    const page = reactive({
        current: initialCurrentPage,
        perPage,
        /**
         * 1 based index of the current page
         */
        get displayedNumber() {
            return this.current + 1
        },
        next() {
            this.current = Math.min(this.max - 1, this.current + 1)
        },
        prev() {
            this.current = Math.max(0, this.current - 1)
        },
    })
    function _canNext() {
        return page.current < page.max - 1
    }
    function _canPrev() {
        return page.current > 0
    }
    const maxPageNumber = computed(() => Math.ceil(page.displayedNumber / page.perPage))

    const canNext = computed(_canNext)
    const canPrev = computed(_canPrev)

    return {
        page,
        max: maxPageNumber,
        canNext,
        canPrev,
    }
}
