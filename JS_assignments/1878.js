function convertSourceToResult(source) {
    // Initialize an empty array to hold the result
    const result = [];
  
    // Create a map to store contacts grouped by batch_id
    const batchMap = {};
  
    // Iterate through the source array
    source.forEach(item => {
      const batchId = item.batch_id; // Get the batch_id
      const contactInfo = { name: item.name, contact: item.contact }; // Extract name and contact
  
      // If the batch_id doesn't exist in the map, initialize it
      if (!batchMap[batchId]) {
        batchMap[batchId] = [];
      }
      
      // Add the contact info to the corresponding batch_id array
      batchMap[batchId].push(contactInfo);
    });
  
    // Convert the batchMap into the desired result format

    for (const [batch_id, contacts] of Object.entries(batchMap)) {
        console.log(batch_id,contacts)
      result.push({ [batch_id]: contacts });
    }
  
    return result;
  }

  // Given source data
  const sourceData = [
    { "batch_id": "123", "name": "Tony", "contact": "9872276210" },
    { "batch_id": "231", "name": "Steve", "contact": "7876543210" },
    { "batch_id": "123", "name": "Bruce", "contact": "6776543210" },
    { "batch_id": "321", "name": "Clint", "contact": "8954643210" },
    { "batch_id": "123", "name": "Peter", "contact": "7666543210" },
    { "batch_id": "231", "name": "Phil", "contact": "8896543210" },
    { "batch_id": "321", "name": "Nick", "contact": "9876521210" }
  ];
  
  // Convert the source data to the result format
  const resultData = convertSourceToResult(sourceData);
  
  // Output the result
  console.log(JSON.stringify(resultData,null, 2));
  