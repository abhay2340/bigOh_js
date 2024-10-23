function updateRoutesBasedOnSubscription(routes, subscription) {
  const findSubscription = (name, subModList) => {
    return subModList ? subModList.find(sub => sub.name === name) : null;
  };

  const processSubComp = (subComps, subs, parentSubscribed) => {
    let redirect = null;
    const updatedSubComps = subComps.map(subComp => {
      const subSubscription = findSubscription(subComp.name, subs?.subMod || []);
      // If parent is unsubscribed, mark all submodules as unsubscribed
      if (!parentSubscribed || !subSubscription || !subSubscription.isSub) {
        subComp.comp = 'UN';
      } else if (!redirect) {
        // Redirect to the first subscribed submodule
        redirect = subComp.name;
      }

      if (subComp.subComp) {
        subComp.subComp = processSubComp(subComp.subComp, subSubscription, subSubscription?.isSub);
      }
      return subComp;
    });

    // If no redirect, return just the updated subcomponents
    if (!redirect) return updatedSubComps;
    // Add the redirect at the beginning of the subcomponent array
    return [{ redirectTo: redirect }, ...updatedSubComps];
  };

  let globalRedirect = null;
  const updatedRoutes = routes.map(route => {
    const routeSub = findSubscription(route.name, subscription);
    const isSubscribed = routeSub && routeSub.isSub;

    if (!isSubscribed) {
      route.comp = 'UN';
    } else if (!globalRedirect) {
      globalRedirect = route.name;
    }

    if (route.subComp) {
      route.subComp = processSubComp(route.subComp, routeSub, isSubscribed);
    }

    return route;
  });

  // Add global redirectTo for the first subscribed module
  updatedRoutes.unshift({ redirectTo: globalRedirect });

  return updatedRoutes;
}

// Example usage:
const routes = [
  {
    name: 'M1',
    comp: 'C1',
  },
  {
    name: 'M2',
    comp: 'C2',
  },
  {
    name: 'M3',
    subComp: [
      {
        name: 'M3A',
        comp: 'C3A',
      },
      {
        name: 'M3B',
        comp: 'C3B',
      },
    ],
  },
  {
    name: 'M4',
    subComp: [
      {
        name: 'M4A',
        comp: 'C4A',
      },
      {
        name: 'M4B',
        comp: 'C4B',
      },
    ],
  },
  {
    name: 'M5',
    subComp: [
      {
        name: 'M5A',
        comp: 'C5A',
      },
      {
        name: 'M5B',
        subComp: [
          {
            name: 'M5BA',
            comp: 'C5BA',
          },
          {
            name: 'M5BB',
            comp: 'C5BB',
          },
          {
            name: 'M5BC',
            comp: 'C5BC',
          },
        ],
      },
      {
        name: 'M5C',
        comp: 'C5C',
      },
    ],
  },
];

const subscription = [
  {
    name: 'M1',
    isSub: false,
  },
  {
    name: 'M2',
    isSub: false,
  },
  {
    name: 'M3',
    isSub: false,
    subMod: [
      {
        name: 'M3A',
        isSub: true,
      },
      {
        name: 'M3B',
        isSub: true,
      },
    ],
  },
  {
    name: 'M4',
    isSub: true,
    subMod: [
      {
        name: 'M4A',
        isSub: false,
      },
      {
        name: 'M4B',
        isSub: true,
      },
    ],
  },
  {
    name: 'M5',
    isSub: true,
    subMod: [
      {
        name: 'M5A',
        isSub: false,
      },
      {
        name: 'M5B',
        isSub: true,
        subComp: [
          {
            name: 'M5BA',
            isSub: false,
          },
          {
            name: 'M5BB',
            isSub: true,
          },
          {
            name: 'M5BC',
            isSub: false,
          },
        ],
      },
      {
        name: 'M5C',
        isSub: true,
      },
    ],
  },
];

// Call the function
const result = updateRoutesBasedOnSubscription(routes, subscription);
console.log(JSON.stringify(result, null, 2));
