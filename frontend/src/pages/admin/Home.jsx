import { useSelector } from "react-redux";
import { selectHome, selectHomeStatus } from "../../features/home/homeSlice";
import Loader from "../../components/common/Loader";

const AdminHome = () => {
  const home = useSelector(selectHome);
  const status = useSelector(selectHomeStatus);

  const hero = home?.hero || {};
  const cta = home?.cta || {};
  const highlights = Array.isArray(home?.highlights) ? home.highlights : [];

  return (
    <div>
      <h1 className="font-disp text-2xl font-bold text-slate-900">Home Settings</h1>
      <p className="mt-1 text-sm text-slate-500">Preview of your homepage content</p>

      {status === "loading" && (
        <div className="mt-6 flex justify-center">
          <Loader size="lg" />
        </div>
      )}

      {status === "error" && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load home content.
        </div>
      )}

      {status === "success" && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-disp text-lg font-bold text-slate-900">Hero</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Title</dt>
                <dd className="mt-1 text-slate-900">{hero.title || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Highlighted Text</dt>
                <dd className="mt-1 text-slate-900">{hero.highlightedText || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Description</dt>
                <dd className="mt-1 text-slate-900">{hero.description || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Button Text</dt>
                <dd className="mt-1 text-slate-900">{hero.buttonText || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Button Link</dt>
                <dd className="mt-1 text-slate-900">{hero.buttonLink || "-"}</dd>
              </div>
              {hero.image?.url && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Image</dt>
                  <dd className="mt-1">
                    <img src={hero.image.url} alt="Hero" className="h-32 w-full rounded-lg object-cover" />
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-disp text-lg font-bold text-slate-900">CTA</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Title</dt>
                <dd className="mt-1 text-slate-900">{cta.title || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Description</dt>
                <dd className="mt-1 text-slate-900">{cta.description || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Button Text</dt>
                <dd className="mt-1 text-slate-900">{cta.buttonText || "-"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Button Link</dt>
                <dd className="mt-1 text-slate-900">{cta.buttonLink || "-"}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="font-disp text-lg font-bold text-slate-900">Highlights</h2>
            {highlights.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">No highlights configured.</p>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {highlights.map((h, i) => (
                  <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Icon</p>
                    <p className="mt-1 text-sm text-slate-900">{h.icon || "-"}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Title</p>
                    <p className="mt-1 text-sm text-slate-900">{h.title || "-"}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Description</p>
                    <p className="mt-1 text-sm text-slate-900">{h.description || "-"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
