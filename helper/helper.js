// Helper function to find a specific stack action
function findStackAction(routes, name) {
    for (var i = 0; i < routes.length; i++) {
        var r = routes[i];
        if (r.routeType === builder.Library.RouteTypes.StackAction &&
            r.routeData.action === name) {
                return r;
        }
    }
    return null;
}