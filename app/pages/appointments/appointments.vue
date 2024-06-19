<template>
<div class="flex flex-col justify-center">
    <div role="tablist" class="tabs tabs-bordered">
  <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Upcoming" />
  <div role="tabpanel" class="tab-content p-10">
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
            <tr>
                <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
                </th>
                <th>#</th>
                <th>Name</th>
                <th>Appointment Date</th>
                <th>Purpose</th>
                <th>Notes</th>
                <!-- <th>Favorite Color</th> -->
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <tr class="bg-base-200">
                <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
                </th>
                <th>1</th>
                <td>Lebron James</td>
                <td>December 14, 2023</td>
                <td>Check-up</td>
                <td></td>
                <!-- <td>Blue</td> -->
            </tr>
            <!-- row 2 -->
            <tr>
                <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
                </th>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>December 15, 2023</td>
                <td>Teeth cleaning</td>
                <td></td>
            </tr>
            <!-- row 3 -->
            <tr>
                <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
                </th>
                <th>3</th>
                <td>Yor Briar</td>
                <td>December 18, 2023</td>
                <td>Teeth alignment</td>
                <td></td>
            </tr>
            <tr>
                <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
                </th>
                <th>4</th>
                <td>Brice Swyre</td>
                <td>December 16, 2023</td>
                <td>Teeth alignment</td>
                <td></td>
            </tr>
            <tr>
                <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
                </th>
                <th>5</th>
                <td>Anya Forger</td>
                <td>December 19, 2023</td>
                <td>Braces</td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>
                </td>
                <th>Actions:</th>
                <td>
                    <button class="btn btn-error">
                        <Icon name="material-symbols:delete-outline" class="text text-lg" />
                        Delete</button>
                </td>
                <td>
                    <!-- add -->
                    <NuxtLink href="./add" class="btn btn-primary join-item">
                        <Icon name="material-symbols:add" class="text text-lg" />
                        Add</NuxtLink>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

  </div>
  <!-- Appointment request -->
    <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Appointment Requests" />
    <div role="tabpanel" class="tab-content p-10">
    </div>
  <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Completed" checked />
  <div role="tabpanel" class="tab-content p-10">Completed</div>

  <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Cancelled" />
  <div role="tabpanel" class="tab-content p-10"> Cancelled</div>
</div>
    
</div>
</template>
<script setup lang="ts">

</script>
