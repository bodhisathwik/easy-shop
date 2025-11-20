export const PromoBanner = () => {
  return (
    <div className="w-full bg-gradient-promo py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="text-secondary-foreground font-semibold text-sm mx-4">
          🎉 Great Indian Festival Sale - Up to 50% OFF on all products!
        </span>
        <span className="text-secondary-foreground font-semibold text-sm mx-4">
          ⚡ Flash Deals Every Hour - Don't Miss Out!
        </span>
        <span className="text-secondary-foreground font-semibold text-sm mx-4">
          🚚 FREE Shipping on orders above ₹10,000
        </span>
        <span className="text-secondary-foreground font-semibold text-sm mx-4">
          🎁 Extra 10% OFF for Premium Members
        </span>
      </div>
    </div>
  );
};
