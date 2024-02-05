export const getAmounts = data => {
  return new Promise((resolve, reject) => {
    try {
      let subtotal = 0;
      let discountPrice = 0;
      let taxPrice = 0;

      // Iterate through the invoiceData array
      data.forEach(item => {
        // Convert item properties to numbers for calculations
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity);
        const discountPercentage = parseFloat(item.discount);
        const taxPercentage = parseFloat(item.tax);

        // Calculate individual item total
        const itemTotal = price * quantity;

        // Calculate individual item discount and tax amounts
        const individualDiscount = (itemTotal * discountPercentage) / 100;
        // const individualTax = (itemTotal * taxPercentage) / 100;
        const individualTax = taxPercentage;
        // Add individual item amounts to the overall totals
        subtotal += itemTotal;
        discountPrice += individualDiscount;
        taxPrice += individualTax;
      });

      // Calculate grand total
      const grandTotal = subtotal - discountPrice + taxPrice;
      resolve({
        grandTotal: grandTotal.toFixed(2),
        subtotal: subtotal.toFixed(2),
        discountPrice: discountPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
      });
      // Display the results
      // console.log('Subtotal: ', subtotal.toFixed(2));
      // console.log('Discount Price: ', discountPrice.toFixed(2));
      // console.log('Tax Price: ', taxPrice.toFixed(2));
      // console.log('Grand Total: ', grandTotal.toFixed(2));
    } catch (error) {
      reject(error);
    }
  });
};
