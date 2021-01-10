export function exportToCsv(csvContent) {
  const encodedContent = encodeURIComponent(JSON.stringify(csvContent));
  const link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedContent);
  link.setAttribute('download', 'results.csv');
  document.body.appendChild(link); // Required for FF

  link.click();
}
