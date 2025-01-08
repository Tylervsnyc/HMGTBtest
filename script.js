document.addEventListener('DOMContentLoaded', () => {
  const incomeCells = document.querySelectorAll('.income');
  const dailyTotalCells = document.querySelectorAll('.daily-total');
  const weeklyTotalCell = document.querySelector('.weekly-total');
  const prompt = document.getElementById('step-prompt');

  const dailyIncome = Array(5).fill(false);

  // Validate daily income and enable daily total
  incomeCells.forEach((cell) => {
    cell.addEventListener('input', () => {
      const day = cell.dataset.day;
      const fluffValue = parseInt(document.querySelector(`.income[data-day="${day}"][data-type="fluff"]`).value) || 0;
      const antValue = parseInt(document.querySelector(`.income[data-day="${day}"][data-type="ant"]`).value) || 0;

      if (fluffValue > 0 && antValue > 0) {
        dailyIncome[day] = true;
        dailyTotalCells[day].disabled = false;
        dailyTotalCells[day].placeholder = '';
        if (dailyIncome.every((status) => status)) {
          prompt.textContent = 'Now fill in the daily totals!';
        }
      }
    });
  });

  // Validate daily totals and enable weekly total
  dailyTotalCells.forEach((cell) => {
    cell.addEventListener('input', () => {
      const day = cell.dataset.day;
      const fluffValue = parseInt(document.querySelector(`.income[data-day="${day}"][data-type="fluff"]`).value) || 0;
      const antValue = parseInt(document.querySelector(`.income[data-day="${day}"][data-type="ant"]`).value) || 0;
      const correctTotal = fluffValue + antValue;

      if (parseInt(cell.value) === correctTotal) {
        cell.classList.add('green');
        cell.classList.remove('yellow');
        if ([...dailyTotalCells].every((input) => input.classList.contains('green'))) {
          weeklyTotalCell.disabled = false;
          weeklyTotalCell.placeholder = 'Enter weekly total';
          prompt.textContent = 'Now fill in the weekly total!';
        }
      } else {
        cell.classList.add('yellow');
        cell.classList.remove('green');
      }
    });
  });

  // Validate weekly total
  weeklyTotalCell.addEventListener('input', () => {
    const weeklyTotalValue = parseInt(weeklyTotalCell.value) || 0;
    const dailyTotalsSum = [...dailyTotalCells].reduce((sum, cell) => sum + (parseInt(cell.value) || 0), 0);

    if (weeklyTotalValue === dailyTotalsSum) {
      weeklyTotalCell.classList.add('green');
      weeklyTotalCell.classList.remove('yellow');
      prompt.textContent = 'Congratulations! All values are correct!';
    } else {
      weeklyTotalCell.classList.add('yellow');
      weeklyTotalCell.classList.remove('green');
      prompt.textContent = 'Check your weekly total!';
    }
  });
});
