"use server";

import { NextResponse } from "next/server";
import Admin from "../models/Admin";
import Customer from "../models/Customer";
import Order from "../models/Order";
import { connectToDB } from "../mongoDB";

export const getTotalSales = async () => {
  await connectToDB();
  const orders = await Order.find();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );
  return { totalOrders, totalRevenue };
};

export const getTotalCustomer = async () => {
  await connectToDB();
  const customers = await Customer.find();
  const totalCustomer = customers.length;
  return totalCustomer;
};

export const salesPerMonth = async () => {
  await connectToDB();
  const orders = await Order.find();

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth();
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    return acc;
  }, {});

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(new Date(0, i))
    );
    return { name: month, sales: salesPerMonth[i] || 0 };
  });
  return graphData;
};
