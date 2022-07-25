const search = () => {
  event.preventDefault();

  const searchQuery = getFormData('search-form');
  const req = { method: 'GET', url: '/todo/lists' };

};