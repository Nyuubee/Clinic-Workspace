<template>
<main class="flex flex-col w-full">
    <div class="text-2xl">
        Medical Gloves Usage:
    </div>
    <Stats
        :daily="60"
        :weekly="240"
        :monthly="900"
        label_daily="Today"
        label_weekly="This Week"
        label_monthly="This Month"
        suffix=" pairs"
    />
    <div class="text-2xl">
        Anesthesia Usage:
    </div>
    <Stats
        :daily="30"
        :weekly="120"
        :monthly="500"
        label_daily="Today"
        label_weekly="This Week"
        label_monthly="This Month"
        suffix="pcs"
    />
    <!-- Table -->
    <table class="table">
        <thead>
            <tr>
                <th></th>
                <th>Item</th>
                <th>Unit</th>
                <th>Critical Level</th>
                <th>Quantity Left</th> <!-- Added column for plus and minus buttons -->
                <th>Supplier</th> <!-- Moved the Supplier column to the end -->
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <td>Medical Gloves</td>
                <td>pair</td>
                <td>50</td>
                <td>
                    <Plusminus
                    :amount="100"
                    :max="1000"
                    :min="0"
                    />
                </td>
                <td>Supplier A</td>
            </tr>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <td>Anesthesia</td>
                <td>pcs</td>
                <td>20</td>
                <td>
                    <Plusminus 
                    :amount="50"
                    :max="1000"
                    :min="0"
                    />
                </td>
                <td>Supplier B</td>
            </tr>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <td>Face Mask</td>
                <td>pcs</td>
                <td>50</td>
                <td>
                    <Plusminus 
                    :amount="100"
                    :max="1000"
                    :min="0"
                    />
                </td>
                <td>Supplier C</td>
            </tr>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <td>Face Shield</td>
                <td>pcs</td>
                <td>50</td>
                <td>
                    <Plusminus 
                    :amount="100"
                    :max="1000"
                    :min="0"
                    />
                </td>
                <td>Supplier D</td>
            </tr>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <td>Alcohol</td>
                <td>L</td>
                <td>50</td>
                <td>
                    <Plusminus
                    :amount="100"
                    :max="1000"
                    :min="0"
                     />
                </td>
                <td>Supplier E</td>
            </tr>
        </tbody>
        <!-- Actions -->
        <tfoot>
            <tr>
                <th colspan="5">
                    <div class="join flex justify-end">
                        <NuxtLink href="./add" class="btn btn-primary join-item">
                            <Icon name="material-symbols:add" class="text text-lg" />
                            Add Item</NuxtLink>
                    </div>
                </th>
            </tr>
        </tfoot>
    </table>
</main>
</template>
<script setup lang="ts">

</script>
