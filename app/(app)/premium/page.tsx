import { createClient } from "@/lib/supabase/server";

export default async function PremiumPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_premium, premium_until")
    .eq("id", user!.id)
    .single();

  const merchantId = process.env.NEXT_PUBLIC_CLICK_MERCHANT_ID;
  const serviceId = process.env.NEXT_PUBLIC_CLICK_SERVICE_ID;
  const price = 29000;
  const clickConfigured = Boolean(merchantId && serviceId);
  const clickUrl = clickConfigured
    ? `https://my.click.uz/services/pay?service_id=${serviceId}&merchant_id=${merchantId}&amount=${price}&transaction_param=${user!.id}`
    : null;

  if (profile?.is_premium) {
    return (
      <div>
        <h1 className="font-sora text-xl font-bold mb-5">💎 Premium</h1>
        <div className="bg-card border border-border rounded-2xl p-6 max-w-md">
          <p className="text-[14px] font-semibold text-good mb-2">Sizda Premium faol ✓</p>
          {profile.premium_until && (
            <p className="text-[12.5px] text-muted">
              Amal qilish muddati: {new Date(profile.premium_until).toLocaleDateString("uz-UZ")}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-sora text-xl font-bold mb-1">💎 Premium</h1>
      <p className="text-muted text-sm mb-5">Cheksiz AI baholash — Writing, Speaking, va boshqa imkoniyatlar</p>

      <div className="grid grid-cols-2 gap-4 max-w-2xl max-[700px]:grid-cols-1">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-[14px] font-bold mb-3">Bepul (hozirgi)</div>
          <ul className="text-[13px] text-muted space-y-2">
            <li>✓ Reading, Listening, Grammar — cheksiz</li>
            <li>✓ Kuniga 1 ta Writing yoki Speaking tekshiruvi</li>
            <li>✓ AI Tutor chat — cheksiz</li>
          </ul>
        </div>
        <div className="bg-card border-2 border-blue rounded-2xl p-5">
          <div className="text-[14px] font-bold mb-1 text-blue">Premium</div>
          <div className="font-sora text-2xl font-bold mb-3">{price.toLocaleString("uz-UZ")} som<span className="text-xs text-muted font-normal">/oy</span></div>
          <ul className="text-[13px] text-muted space-y-2 mb-4">
            <li>✓ Cheksiz Writing va Speaking tekshiruvi</li>
            <li>✓ Barcha darajalar va darslar</li>
            <li>✓ Kelajakdagi yangi imkoniyatlarga erta kirish</li>
          </ul>
          {clickUrl ? (
            <a href={clickUrl} className="block text-center bg-grad text-white text-sm font-semibold px-4 py-2.5 rounded-lg">
              To'lov qilish (Click)
            </a>
          ) : (
            <div className="text-[12px] text-muted bg-bg2 border border-border rounded-lg p-3">
              To'lov tizimi hali ulanmagan. Hozircha admin bilan bevosita bog'laning.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
