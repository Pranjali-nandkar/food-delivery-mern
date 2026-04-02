const test = async () => {
  try {
    console.log('Testing /api/restaurants...');
    const res = await fetch('http://localhost:5000/api/restaurants');
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Success!', data.length, 'restaurants found.');
  } catch (err) {
    console.error('Failed!', err.message);
  }
};

test();
