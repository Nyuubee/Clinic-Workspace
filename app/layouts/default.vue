<!-- defines a sidebar + main content layout -->
<!-- Uses ff DaisyUI components: -->
<!-- drawer, navbar -->
<!-- There are named slots that can be used by overriding the layout in the corresponding page -->
<template>
  <div class="flex min-h-screen">
    <div class="drawer xl:drawer-open">
      <input id="sidebar" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <!-- Page content here -->
        <!-- App bar -->
        <div class="navbar bg-base-100 sticky top-0 z-10">
          <div class="navbar-start">
            <!-- burger menu -->
            <label for="sidebar" class="btn btn-ghost rounded-btn xl:hidden">
              <Icon name="material-symbols:menu" class="text-2xl" />
            </label>
            <slot name="navbar-start">

            </slot>
          </div>
          <div class="navbar-center">
            <slot name="navbar-center">

            </slot>
          </div>
          <div class="navbar-end">
            <slot name="navbar-end"></slot>
          </div>
        </div>
        <!-- Main content -->
        <div class="p-2 w-full h-full flex flex-col">
          <slot></slot>
        </div>
      </div>
      <div class="drawer-side z-10">
        <label for="sidebar" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-2 w-64 min-h-full bg-base-200 text-base-content">
          <!-- Sidebar content here -->
          <li>
            <NuxtLink to="/user" active-class="active">
              <div class="avatar">
                <div class="w-8 rounded-full">
                  <img :src="data?.user?.image" />
                </div>
              </div>
              {{ data?.user?.name }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/appointments/appointments" active-class="active">
              <Icon name="material-symbols:alarm-on-outline" />
              Appointments
            </NuxtLink>
          </li>
          <li>
            <details open>
              <summary>
                <Icon name="material-symbols:edit-document" /> Dental Record
              </summary>
              <ul>
                <li>
                  <NuxtLink to="/dental-chart/overview" active-class="active">
                    <!-- think of an icon for overview -->
                    <Icon name="material-symbols:table" />
                    Overview
                  </NuxtLink>
                </li>
                <slot name="dental-record"></slot>
              </ul>
            </details>
          </li>
          <li>
            <NuxtLink to="/payments" active-class="active">
              <Icon name="material-symbols:payments-outline-rounded" />
              Payment
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/supplies/" active-class="active">
              <Icon name="material-symbols:inventory-2-outline" />
              Supplies
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/help" active-class="active">
              <Icon name="material-symbols:question-mark-rounded" />
              Help
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" active-class="active">
              <Icon name="material-symbols:info-outline-rounded" />
              About
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const {data} = useAuth();

</script>
<style>
:root {
  font-family: Roboto, sans-serif;
}
</style>
