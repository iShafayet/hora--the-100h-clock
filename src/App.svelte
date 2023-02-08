<script lang="ts">
  // Core
  import Drawer, {
    Content,
    Header,
    Scrim,
    Subtitle,
    Title as DrawerTitle,
  } from "@smui/drawer";
  import IconButton from "@smui/icon-button";
  import List, { Item, Text } from "@smui/list";
  import type { TopAppBarComponentDev } from "@smui/top-app-bar";
  import TopAppBar, {
    AutoAdjust,
    Row,
    Section,
    Title,
  } from "@smui/top-app-bar";
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  // Pages
  import ConverterPage from "./component/page/ConverterPage.svelte";
  import DashboardPage from "./component/page/DashboardPage.svelte";
  import PhilosophyPage from "./component/page/PhilosophyPage.svelte";
  // Components
  import Footer from "./component/common/Footer.svelte";
  import ObtrusiveLoader from "./component/common/ObtrusiveLoader.svelte";
  import AlertDialog from "./component/dialog/AlertDialog.svelte";
  import ConfirmationDialog from "./component/dialog/ConfirmationDialog.svelte";
  import ConfirmationThreeStateDialog from "./component/dialog/ConfirmationThreeStateDialog.svelte";
  import PromptDialog from "./component/dialog/PromptDialog.svelte";
  // Stores
  // Local Misc
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import {
    navigateToPreviousPageOrDashboard,
    navigateToRoute,
  } from "./lib/navigation-helper.js";

  const svelteToastOptions = {};

  let topAppBar: TopAppBarComponentDev;

  let isLeftDrawerOpen = false;

  let activeRouteAdditionalData = null;

  const dashboardRoute = wrap({
    component: DashboardPage,
  });

  const converterRoute = wrap({
    component: ConverterPage,
  });

  const philosophyRoute = wrap({
    component: PhilosophyPage,
  });

  const routes = {
    "/dashboard": dashboardRoute,
    "/converter": converterRoute,
    "/philosophy": philosophyRoute,
    "/": dashboardRoute,
  };

  // Handles the "conditionsFailed" event dispatched by the router when a component can't be loaded because one of its pre-condition failed
  function conditionsFailed(event) {
    console.debug("conditionsFailed:", event.detail);
    let data = event.detail.userData as any;

    if (data.requiresAuthentication && !data.isUserLoggedIn) {
      delete data.isUserLoggedIn;
      navigateToRoute("/dashboard", { replaceCurrentRoute: true });
    }
  }

  // Handles the "routeLoaded" event dispatched by the router when a component was loaded
  function routeLoaded(event) {
    let { detail } = event;
    console.debug("routeLoaded:", event);
    let data = event.detail.userData as any;

    activeRouteAdditionalData = data;
  }

  onMount(async () => {});

  const genericLinkClicked = async (path) => {
    navigateToRoute(path);
    isLeftDrawerOpen = false;
  };
</script>

<main class="h-main">
  <SvelteToast {svelteToastOptions} />
  <ObtrusiveLoader />
  <ConfirmationDialog />
  <AlertDialog />
  <PromptDialog />
  <ConfirmationThreeStateDialog />

  <Drawer variant="modal" bind:open={isLeftDrawerOpen}>
    <Header>
      <DrawerTitle>Hṓra</DrawerTitle>
      <Subtitle>The 100h Clock</Subtitle>
    </Header>
    <Content class="h-menu-master-container">
      <List class="h-menu">
        <Item
          href="javascript:void(0)"
          on:click={() => genericLinkClicked(`/dashboard`)}
          activated={true}
        >
          <Text>Dashboard</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => genericLinkClicked(`/converter`)}
          activated={true}
        >
          <Text>Converter</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => genericLinkClicked(`/philosophy`)}
          activated={true}
        >
          <Text>Philosophy</Text>
        </Item>
      </List>
    </Content>
  </Drawer>

  <Scrim />

  <TopAppBar bind:this={topAppBar} variant="standard" class="h-top-bar">
    <Row>
      <Section>
        {#if !activeRouteAdditionalData || !activeRouteAdditionalData.backButton}
          <IconButton
            class="material-icons top-bar-icon"
            on:click={() => (isLeftDrawerOpen = !isLeftDrawerOpen)}
            >menu
          </IconButton>
        {/if}

        {#if activeRouteAdditionalData && activeRouteAdditionalData.backButton}
          <IconButton
            class="material-icons top-bar-icon"
            on:click={() => navigateToPreviousPageOrDashboard()}
            >arrow_back
          </IconButton>
        {/if}
        <Title>
          {activeRouteAdditionalData && activeRouteAdditionalData.title
            ? activeRouteAdditionalData.title
            : "Hṓra"}
        </Title>
      </Section>
      <Section align="end" toolbar />
    </Row>
  </TopAppBar>
  <AutoAdjust {topAppBar}>
    <Router
      {routes}
      on:conditionsFailed={conditionsFailed}
      on:routeLoaded={routeLoaded}
    />
  </AutoAdjust>
  <Footer />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  :global(.h-top-bar) {
    background-color: transparent;
    color: #102027;
  }

  :global(.top-bar-icon) {
    /* background-color: transparent; */
    color: #102027 !important;
  }
</style>
