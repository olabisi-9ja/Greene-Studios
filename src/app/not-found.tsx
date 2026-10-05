import GreeneLayout from "./(greene)/layout";
import NotFound from "./(greene)/not-found";

/**
 * Addresses that match no route at all land here, outside the (greene)
 * group, so the site's frame is added around the same 404 page.
 */
export default function RootNotFound() {
  return (
    <GreeneLayout>
      <NotFound />
    </GreeneLayout>
  );
}
