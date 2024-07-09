document.addEventListener('DOMContentLoaded', function () {
    const invoiceItems = document.getElementById('invoice-items');
    const addLineItemButton = document.getElementById('add-line-item');
    const subTotalElement = document.getElementById('sub-total');
    const totalElement = document.getElementById('total');

    function calculateTotal() {
        let subTotal = 0;

        const invoiceItemsRows = invoiceItems.getElementsByTagName('tr');

        for (let i = 0; i < invoiceItemsRows.length; i++) {
            const row = invoiceItemsRows[i];
            const qtyInput = row.querySelector('.qty');
            const rateInput = row.querySelector('.rate');
            const sgstInput = row.querySelector('.sgst');
            const cgstInput = row.querySelector('.cgst');
            const cessInput = row.querySelector('.cess');
            const amountInput = row.querySelector('.amount');

            if (qtyInput && rateInput && sgstInput && cgstInput && cessInput && amountInput) {
                const qty = parseFloat(qtyInput.value) || 0;
                const rate = parseFloat(rateInput.value) || 0;
                const sgst = parseFloat(sgstInput.value) || 0;
                const cgst = parseFloat(cgstInput.value) || 0;
                const cess = parseFloat(cessInput.value) || 0;

                const amount = qty * rate + (qty * rate * sgst / 100) + (qty * rate * cgst / 100) + (qty * rate * cess / 100);
                amountInput.value = amount.toFixed(2);

                if (!isNaN(amount)) {
                    subTotal += amount;
                }
            }
        }

        const total = subTotal;

        subTotalElement.textContent = subTotal.toFixed(2);
        totalElement.textContent = total.toFixed(2);
    }

    addLineItemButton.addEventListener('click', () => {
        const newInvoiceItem = `
            <tr>
                <td><input type="text" class="form-control" placeholder="Enter item name/description"></td>
                <td><input type="number" class="form-control qty" value="1"></td>
                <td><input type="number" class="form-control rate" value="0.00"></td>
                <td><input type="number" class="form-control sgst" value="0"></td>
                <td><input type="number" class="form-control cgst" value="0"></td>
                <td><input type="number" class="form-control cess" value="0"></td>
                <td><input type="number" class="form-control amount" value="0.00" readonly></td>
                <td><button class="delete-button btn btn-danger">X</button></td>
            </tr>
        `;
        invoiceItems.insertAdjacentHTML('beforeend', newInvoiceItem);
    });

    invoiceItems.addEventListener('input', calculateTotal);

    invoiceItems.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
            event.target.closest('tr').remove();
            calculateTotal();
        }
    });

    $('#invoice-date').datepicker({
        format: 'M dd, yyyy'
    });

    $('#due-date').datepicker({
        format: 'M dd, yyyy'
    });
});