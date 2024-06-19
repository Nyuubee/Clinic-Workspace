<template>
 <div class="grid grid-cols-3 gap-x-8" v-if="tooth">
      <!-- Legends -->
        <LegendSelection v-model:tooth="tooth"  />
        <div class="flex flex-col items-center">

          <h2 class="text-2xl font-bold">
            Preview
          </h2>
          <div class="h-max grid grid-cols-2 gap-x-1">
          <div v-for="id in checkedStates" class="text-2xl">
              {{ id }}
          </div>
        </div>
          <div class="text-4xl font-bold">
            {{ tooth.id }}
          </div>
          &nbsp;
        <!-- Need to use max-w-max-content here, otherwise the content box will be HUGE -->
          <ToothModel
          :tooth-id="tooth.id"
          :region="tooth.region"
          @region-click="region => tooth?.nextRegionState(region)"
          class="max-w-[max-content]" 
          style=" --stroke-width: 2; scale:2"
          />
      </div>
    </div>
</template>
<script setup lang="ts">
import { Tooth } from '~/utils/peri/Tooth';
import LegendSelection from './LegendSelection.vue';
import ToothModel from './ToothModel.vue';
const tooth = defineModel<Tooth>('tooth');

const checkedStates = computed(() => {
  return Object.entries(tooth.value?.states ?? {})
    .filter(([_,truthy]) => truthy)
    .map(([key]) => key as keyof Tooth['states']);
})

</script>
