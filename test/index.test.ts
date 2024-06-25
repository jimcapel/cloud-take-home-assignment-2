import { KinesisStreamEvent } from 'aws-lambda';
import { handler } from 'src';

const dummyInputNodata: KinesisStreamEvent = {
  Records: [],
};

const dummyInputdData = {
  Records: [
    {
      kinesis: {
        data:
          'eyJpZCI6ImE0Mzg4MTMxLTE0OTItMTFlYy1hMGIyLWM3OGZmYmQ2OTM0NyIsInBhcnRpdGlvbktleSI6ImM3NzI0YjA2LTgxM2QtNDEwYS1hZGJjLTdkMTllYmZmMDRiMiIsInRpbWVzdGFtcCI6MTYzMTUzODA1OTQ1OSwidHlwZSI6ImJvb2tpbmdfcmVxdWVzdGVkIiwiYm9va2luZ19yZXF1ZXN0ZWQiOnsidGltZXN0YW1wIjoxNjMxNTM4MDU5NDU5LCJvcmRlcklkIjoxMDAxNiwicHJvZHVjdF9wcm92aWRlciI6IkJyaXR0YW55IEZlcnJpZXMifX0=',
        partitionKey: 'c7724b06-813d-410a-adbc-7d19ebff04b2',
        approximateArrivalTimestamp: 1631538059459,
        kinesisSchemaVersion: '1.0',
        sequenceNumber: 'c7724b06-813d-410a-adbc-7d19ebff04b2',
      },
      eventSource: 'aws:kinesis',
      eventID:
        'shardId-000000000000:49545115243490985018280067714973144582180062593244200961',
      invokeIdentityArn: 'arn:aws:iam::EXAMPLE',
      eventVersion: '1.0',
      eventName: 'aws:kinesis:record',
      eventSourceARN: 'arn:aws:kinesis:EXAMPLE',
      awsRegion: 'us-east-1',
    },
  ],
};

// missing timestamp in data
const dummyInputdDataMissingTimestamp = {
  Records: [
    {
      kinesis: {
        data:
          'eyJpZCI6ImE0Mzg4MTMxLTE0OTItMTFlYy1hMGIyLWM3OGZmYmQ2OTM0NyIsInBhcnRpdGlvbktleSI6ImM3NzI0YjA2LTgxM2QtNDEwYS1hZGJjLTdkMTllYmZmMDRiMiIsInRpbWVzdGFtcCI6MTYzMTUzODA1OTQ1OSwidHlwZSI6ImJvb2tpbmdfcmVxdWVzdGVkIiwiYm9va2luZ19yZXF1ZXN0ZWQiOnsib3JkZXJJZCI6MTAwMTYsInByb2R1Y3RfcHJvdmlkZXIiOiJCcml0dGFueSBGZXJyaWVzIn19',
        partitionKey: 'c7724b06-813d-410a-adbc-7d19ebff04b2',
        approximateArrivalTimestamp: 1631538059459,
        kinesisSchemaVersion: '1.0',
        sequenceNumber: 'c7724b06-813d-410a-adbc-7d19ebff04b2',
      },
      eventSource: 'aws:kinesis',
      eventID:
        'shardId-000000000000:49545115243490985018280067714973144582180062593244200961',
      invokeIdentityArn: 'arn:aws:iam::EXAMPLE',
      eventVersion: '1.0',
      eventName: 'aws:kinesis:record',
      eventSourceARN: 'arn:aws:kinesis:EXAMPLE',
      awsRegion: 'us-east-1',
    },
  ],
};

describe('Input tests', () => {
  test('Empty records list should pass', () => {
    expect(handler(dummyInputNodata)).to.not.Throw;
  });

  test('Correct input data passes', () => {
    expect(handler(dummyInputdData)).not.to.Throw;
  });

  test('Record list with bad data does not break handler function, data is missing timestamp', () => {
    expect(handler(dummyInputdDataMissingTimestamp)).not.to.Throw;
  });
});
